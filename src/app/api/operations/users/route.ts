import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { SERVER_ACTIONS } from "../../../../../serveractions/Actions/SERVER_ACTIONS";
import { accountStatus } from "@prisma/client";

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
        return new Response(JSON.stringify(response));
      }

      const formattedUser = await SERVER_ACTIONS.formatter.formatUser(user.id);
      response.status = 200;
      response.message = `User ${user.name} found!`;
      response.data = formattedUser;
      return new Response(JSON.stringify(response));
    }

    const rawUsers = await prisma.user.findMany({
      omit: {
        password: true,
      },
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
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}

export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const id = req.nextUrl.searchParams.get("id");
    const status: accountStatus = await req.json();

    if (!id) {
      response.status = 400;
      response.message = `Id is required`;
      return new Response(JSON.stringify(response));
    }

    if (!status) {
      response.status = 400;
      response.message = `status is required`;
      return new Response(JSON.stringify(response));
    }

    const isExists = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = `User with id '${id}' does not exists.`;
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    const user = await SERVER_ACTIONS.formatter.formatUser(id);

    response.status = 200;
    response.message = `Status changed for user ${user.name}`;
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
      response.message = `id is required`;
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      response.status = 400;
      response.message = `User with id '${id}' does not exists.`;
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        deleted: true,
      },
    });

    response.status = 200;
    response.message = `Status changed for user ${user.name}`;
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
