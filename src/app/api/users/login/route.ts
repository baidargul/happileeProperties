import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { SERVER_ACTIONS } from "../../../../../serveractions/Actions/SERVER_ACTIONS";
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

export async function POST(req: NextRequest) {
  const cookie = require("cookie");
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    let isExists: any;

    isExists = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "No account registered with these details";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.user.findFirst({
      where: {
        email: String(data.email),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (isExists.deleted) {
      response.status = 400;
      response.message = "No account registered with these details";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.password) {
      response.status = 400;
      response.message = "All fields are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const isPasswordValid = data.password === isExists.password;

    // const isPasswordValid = await bcrypt.compare(
    //   data.password,
    //   isExists.password
    // );

    if (!isPasswordValid) {
      response.status = 400;
      response.message = "Invalid password";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    // write login logic

    // Create a JWT token
    // const token = jwt.sign(
    //   { id: isExists.id, email: isExists.email },
    //   JWT_SECRET,
    //   {
    //     expiresIn: "1h", // Set token expiration time
    //   }
    // );

    // Set the cookie
    // const cookieOptions = {
    //   httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    //   secure: process.env.NODE_ENV === "production", // Set to true in production
    //   maxAge: 3600, // Cookie expiration time in seconds
    //   path: "/", // Path where the cookie is accessible
    // };

    // const serializedCookie = cookie.serialize("token", token, cookieOptions);

    const user = await SERVER_ACTIONS.formatter.formatUser(isExists.id);

    if (!user) {
      response.status = 400;
      response.message = "User not found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const token = JWTUtils.generateToken(user);

    response.status = 200;
    response.message = "User logged in successfully";
    response.data = user;
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
