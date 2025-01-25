import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";
import { formatter } from "../../../../../../serveractions/Actions/partials/format";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.id) {
      response.status = 400;
      response.message = "Invalid Request";
      return new Response(JSON.stringify(response));
    }

    if (!data.isSalesPerson) {
      response.status = 400;
      response.message = "isSalePerson is required";
      return new Response(JSON.stringify(response));
    }

    let isExists: any = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!isExists) {
      response.status = 404;
      response.message = "User not found";
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.agent.findUnique({
      where: {
        userId: data.id,
      },
    });

    if (!isExists) {
      response.status = 404;
      response.message = "Agent not found or this person is not an agent.";
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.agent.update({
      where: {
        userId: data.id,
      },
      data: {
        isSalesPerson: data.isSalesPerson,
      },
    });

    const user = await formatter.formatUser(data.id);

    response.status = 200;
    response.message = "Success";
    response.data = user;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
