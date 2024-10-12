import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { accountTypes } from "@prisma/client";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    let isExists: any;
    isExists = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "No account registered with these details.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.buyer.findUnique({
      where: {
        id: data.id,
      },
    });

    if (isExists) {
      response.status = 400;
      response.message = "User already a buyer.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.buyer.create({
      data: {
        userId: data.id,
        address: data.address ? data.address : null,
        description: data.description ? data.description : null,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
      include: {
        buyer: true,
      },
      omit: {
        password: true,
      },
    });

    response.status = 200;
    response.message = "Buyer created successfully.";
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

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const users = await prisma.user.findMany({
      where: {
        type: accountTypes.BUYER,
      },
      orderBy: {
        name: "asc",
      },
      include: {
        buyer: true,
      },
      omit: {
        password: true,
      },
    });

    if (users.length < 1) {
      response.status = 200;
      response.message = "No buyers found.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    response.status = 200;
    response.message = "Buyers fetched successfully.";
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
