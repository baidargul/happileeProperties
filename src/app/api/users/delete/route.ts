import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";

export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.id) {
      response.status = 400;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExists: any = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "No account registered with these details";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.image.deleteMany({
      where: {
        userId: data.id,
      },
    });

    await prisma.builder.deleteMany({
      where: {
        id: data.id,
      },
    });

    await prisma.agent.deleteMany({
      where: {
        id: data.id,
      },
    });

    await prisma.user.deleteMany({
      where: {
        id: data.id,
      },
    });

    response.status = 200;
    response.message = "User deleted successfully";
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

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    await prisma.image.deleteMany({});

    await prisma.builder.deleteMany({});

    await prisma.agent.deleteMany({});

    await prisma.user.deleteMany({});

    await prisma.user.deleteMany({});

    response.status = 200;
    response.message = "Users deleted successfully";
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
