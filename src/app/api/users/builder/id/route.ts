import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";
import { NextApiRequest } from "next";
import { SERVER_ACTIONS } from "../../../../../../serveractions/Actions/SERVER_ACTIONS";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      response.status = 400;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const builder = await prisma.builder.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          include: {
            image: true,
          },
        },
      },
    });

    if (!builder) {
      response.status = 400;
      response.message = "No builder found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const rawUser = await prisma.user.findUnique({
      where: {
        id: builder.userId,
      },
      include: {
        image: true,
        builder: true,
      },
    });

    if (!rawUser) {
      response.status = 400;
      response.message = "No user found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await SERVER_ACTIONS.formatter.formatUser(rawUser.id);

    response.status = 200;
    response.message = builder ? "Found builder" : "No builder found";
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
