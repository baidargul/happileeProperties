import prisma from "../../../../serveractions/commands/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import jwt
import cookie from "cookie";
import { JWTUtils } from "@/lib/jwtUtils";
import { SERVER_ACTIONS } from "../../../../serveractions/Actions/SERVER_ACTIONS";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Make sure to define your secret key

export async function POST(req: NextRequest) {
  const cookie = require("cookie");
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    // Check for existing user by email
    const emailExists = await prisma.user.findFirst({
      where: {
        email: data.email,
        deleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (emailExists) {
      response.status = 400;
      response.message = "User already with this email exists";
      response.data = null;
      return new Response(JSON.stringify(response), { status: 400 });
    }

    // Check for existing user by phone
    const phoneExists = await prisma.user.findFirst({
      where: {
        phone: data.phone,
        deleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (phoneExists) {
      response.status = 400;
      response.message = "User already with this phone number exists";
      response.data = null;
      return new Response(JSON.stringify(response), { status: 400 });
    }

    // Check for required fields
    if (!data.name || !data.email || !data.phone || !data.password) {
      response.status = 400;
      response.message = "All fields are required";
      response.data = null;
      return new Response(JSON.stringify(response), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: data.password, //hashedPassword,
        createdAt: new Date(),
      },
    });

    // Create a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Set token expiration time
    });

    // Set the cookie options
    const cookieOptions = {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 3600, // Cookie expiration time in seconds
      path: "/", // Path where the cookie is accessible
    };

    // Serialize the cookie
    const serializedCookie = cookie.serialize("token", token, cookieOptions);

    // Prepare the response
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
    return new Response(JSON.stringify(response), { status: 500 });
    //asds
  }
}
export async function PATCH(req: NextRequest) {
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

export async function PUT(req: NextRequest) {
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

    const rawUser = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
      include: {
        builder: true,
        image: true,
      },
    });

    if (!rawUser) {
      response.status = 400;
      response.message = "User not found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await SERVER_ACTIONS.formatter.formatUser(rawUser.id);

    response.status = 200;
    response.message = "User fetched successfully";
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
    const rawUsers = await prisma.user.findMany({
      include: {
        builder: true,
        image: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const users = [];
    for (const item of rawUsers) {
      const user = await SERVER_ACTIONS.formatter.formatUser(item.id);
      users.push(user);
    }

    response.status = 200;
    response.message = "Users fetched successfully";
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
