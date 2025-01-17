import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";
import { NextApiRequest } from "next";

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

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        agent: true,
      },
    });

    if (!user) {
      response.status = 400;
      response.message = "No agent found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    response.status = 200;
    response.message = user ? "Found Agent" : "No agent found";
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
