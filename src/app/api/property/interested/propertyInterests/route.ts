import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";
import { SERVER_ACTIONS } from "../../../../../../serveractions/Actions/SERVER_ACTIONS";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();
    const { propertyId } = data;

    if (!propertyId) {
      response.status = 400;
      response.message = "Property id is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExists: any = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "Property does not exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.interested.findMany({
      where: {
        propertyId: propertyId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let users = [];

    for (const item of isExists) {
      const res = await SERVER_ACTIONS.formatter.formatUser(item);
      users.push(res);
    }

    response.status = 200;
    response.message = `Found ${users.length} interested users`;
    response.data = users;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
