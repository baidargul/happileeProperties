import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { accountStatus, accountTypes, user } from "@prisma/client";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.id) {
      response.status = 404;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.rera) {
      response.status = 400;
      response.message = "Rera is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExists: user | null = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!isExists) {
      response.status = 404;
      response.message = "User doesn't exists!";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (isExists.type !== accountTypes.AGENT) {
      response.status = 400;
      response.message = `User is '${isExists.type}'. Please change type before creating agent.`;
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await prisma.agent.create({
      data: {
        userId: data.id,
        rera: data.rera,
        description: data.description ? data.description : "",
        experience: data.experience ? Number(data.experience).toFixed(0) : 0,
      },
    });

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        status: accountStatus.PENDING,
      },
    });

    const finalUser = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
      include: {
        agent: true,
      },
      omit: {
        password: true,
      },
    });

    response.status = 200;
    response.message = "Agent created";
    response.data = finalUser;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null,
  };

  try {
    const users: any = await prisma.user.findMany({
      where: {
        type: accountTypes.AGENT,
      },
      orderBy: {
        name: "asc",
      },
      include: {
        agent: true,
      },
      omit: {
        password: true,
      },
    });

    if (users.length < 1) {
      response.status = 200;
      response.message = "No agents found";
      return new Response(JSON.stringify(response));
    }

    response.status = 200;
    response.message = `Found (${users.length}) agents`;
    response.data = users;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response));
  }
}
