import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { accountTypes, user } from "@prisma/client";
import { JWTUtils } from "@/lib/jwtUtils";

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

//FOR REGISTRATION
export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.email) {
      response.status = 400;
      response.message = "Email is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.password) {
      response.status = 400;
      response.message = "Password is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.name) {
      response.status = 400;
      response.message = "Name is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExists: any = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (isExists) {
      response.status = 400;
      response.message = "User already exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.user.findMany({
      where: {
        type: "SUPERADMIN",
      },
    });

    let newUser: any;
    if (isExists.length < 1) {
      newUser = await prisma.user.create({
        data: {
          ...data,
          type: "SUPERADMIN",
        },
      });
    } else {
      newUser = await prisma.user.create({
        data: {
          ...data,
          type: "ADMIN",
        },
      });
    }

    response.status = 200;
    response.message = "User created successfully";
    response.data = newUser;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
// FOR UPDATE
export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.email) {
      response.status = 400;
      response.message = "Email is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.password) {
      response.status = 400;
      response.message = "Password is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.name) {
      response.status = 400;
      response.message = "Name is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExists: any = await prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message =
        "User with these details does not exist, check email/password";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await prisma.user.update({
      where: {
        id: isExists.id,
      },
      data: {
        ...data,
      },
    });

    response.status = 200;
    response.message = "User updated successfully";
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
// FOR LOGIN
export async function PUT(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.email) {
      response.status = 400;
      response.message = "Email is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.password) {
      response.status = 400;
      response.message = "Password is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExists: any = await prisma.user.findFirst({
      where: {
        email: data.email,
        deleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "No user found with these details";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
        deleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "Invalid email and password";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (
      isExists.type !== accountTypes.SUPERADMIN &&
      isExists.type !== accountTypes.ADMIN
    ) {
      response.status = 400;
      response.message =
        "You are not authorized to login, this is a private API for admins only.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const token = JWTUtils.generateToken(isExists);

    response.status = 200;
    response.message = "User found successfully";
    response.data = isExists;
    const newResponse = JWTUtils.createResponseHeader(response, token);
    return newResponse;
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
