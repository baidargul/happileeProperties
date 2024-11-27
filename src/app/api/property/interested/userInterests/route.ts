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
    const { userId } = data;

    if (!userId) {
      response.status = 400;
      response.message = "User id is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExists: any = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "User does not exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.interested.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let properties = [];

    for (const item of isExists) {
      const res = await SERVER_ACTIONS.formatter.formattedProperty(item);
      properties.push(res);
    }

    response.status = 200;
    response.message = `Found ${properties.length} interested properties`;
    response.data = properties;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
