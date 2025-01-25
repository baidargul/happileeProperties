import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";
import { formatter } from "../../../../../../serveractions/Actions/partials/format";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

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

    if (!data.builderIds && data.builderIds?.length === 0) {
      response.status = 400;
      response.message = "BuilderIds are required";
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

    const agent = await prisma.agent.findUnique({
      where: {
        userId: data.id,
      },
    });

    if (!agent) {
      response.status = 404;
      response.message = "Agent not found or this person is not an agent.";
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.builder.findMany({
      where: {
        id: { in: data.builderIds },
      },
    });

    if (isExists.length !== data.builderIds.length) {
      response.status = 404;
      response.message = "Builder not found";
      return new Response(JSON.stringify(response));
    }

    await prisma.assignedTo.deleteMany({
      where: {
        agentId: agent.id,
      },
    });

    for (const builderId of data.builderIds) {
      await prisma.assignedTo.create({
        data: {
          agentId: agent.id,
          builderId: builderId,
        },
      });
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
