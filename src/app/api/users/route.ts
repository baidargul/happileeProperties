import prisma from "../../../../serveractions/commands/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import jwt
import cookie from "cookie"; // Import cookie

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Make sure to define your secret key

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
        email: data.email,
      },
    });

    if (isExists) {
      response.status = 400;
      response.message = "User already with this email exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });

    if (isExists) {
      response.status = 400;
      response.message = "User already with this phone number exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.name || !data.email || !data.phone || !data.password) {
      response.status = 400;
      response.message = "All fields are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
      },
      include: {
        builder: true,
        image: true,
      },
    });

    // Create a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Set token expiration time
    });

    // Set the cookie
    const cookieOptions = {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 3600, // Cookie expiration time in seconds
      path: "/", // Path where the cookie is accessible
    };

    const serializedCookie = cookie.serialize("token", token, cookieOptions);

    response.status = 200;
    response.message = "User created successfully";
    response.data = user;

    // Return the response with the cookie
    return new Response(JSON.stringify(response), {
      headers: {
        "Set-Cookie": serializedCookie, // Set the cookie in the response
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
