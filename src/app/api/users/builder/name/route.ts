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
    const id = req.nextUrl.searchParams.get("name");

    if (!id) {
      response.status = 400;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const builder = await prisma.builder.findMany({
      where: {
        user: {
          name: id,
        },
      },
      include: {
        user: true,
      },
    });

    response.status = 200;
    response.message =
      builder.length > 0
        ? `Found ${builder.length} builders.`
        : "No builder found!";
    response.data = builder;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}