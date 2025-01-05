import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { SERVER_ACTIONS } from "../../../../../serveractions/Actions/SERVER_ACTIONS";
import { accountStatus } from "@prisma/client";

// Utility function to handle CORS

// GET handler
export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        response.status = 400;
        response.message = `No user exists with id ${id}`;
        response.data = null;
        return new Response(JSON.stringify(response), { status: 400 });
      }

      const formattedUser = await SERVER_ACTIONS.formatter.formatUser(user.id);
      response.status = 200;
      response.message = `User ${user.name} found!`;
      response.data = formattedUser;
      return new Response(JSON.stringify(response), { status: 200 });
    }

    const rawUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const users = [];
    for (const item of rawUsers) {
      const user = await SERVER_ACTIONS.formatter.formatUser(item.id);
      users.push(user);
    }

    response.status = 200;
    response.message = `${users.length} users found.`;
    response.data = users;
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    console.error("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response), { status: 500 });
  }
}

// PATCH handler
export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const id = req.nextUrl.searchParams.get("id");
    const { status }: { status: accountStatus } = await req.json();
    const bluetickVerified: boolean = await req.json();

    if (!id) {
      response.status = 400;
      response.message = `Id is required`;
      return new Response(JSON.stringify(response), { status: 400 });
    }

    if (!status) {
      response.status = 400;
      response.message = `Status is required`;
      return new Response(JSON.stringify(response), { status: 400 });
    }

    const isExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = `User with id '${id}' does not exist.`;
      response.data = null;
      return new Response(JSON.stringify(response), { status: 400 });
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    if (bluetickVerified) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          bluetickVerified,
        },
      });
    }

    const user = await SERVER_ACTIONS.formatter.formatUser(id);

    response.status = 200;
    response.message = `Status changed for user ${user.name}`;
    response.data = user;
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    console.error("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response), { status: 500 });
  }
}

// DELETE handler
export async function DELETE(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      response.status = 400;
      response.message = `Id is required`;
      response.data = null;
      return new Response(JSON.stringify(response), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      response.status = 400;
      response.message = `User with id '${id}' does not exist.`;
      response.data = null;
      return new Response(JSON.stringify(response), { status: 400 });
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });

    response.status = 200;
    response.message = `User ${user.name} marked as deleted.`;
    response.data = user;
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    console.error("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response), { status: 500 });
  }
}
