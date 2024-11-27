import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();
    const { propertyId, userId } = data;

    if (!propertyId) {
      response.status = 400;
      response.message = "Property Id not provided";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!userId) {
      response.status = 400;
      response.message = "User Id not provided";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExists: any = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!isExists) return;

    isExists = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        buyer: true,
      },
    });

    if (!isExists) return;

    if (!isExists.buyer.id) return;

    isExists = await prisma.interested.findMany({
      where: {
        propertyId: propertyId,
        userId: userId,
      },
    });

    if (isExists) {
      response.status = 200;
      response.message = "User already interested";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.interested.create({
      data: {
        propertyId: propertyId,
        userId: userId,
      },
    });

    response.status = 200;
    response.message = "Interest added";
    response.data = null;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
