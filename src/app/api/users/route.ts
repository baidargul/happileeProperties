import prisma from "../../../../serveractions/commands/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  type dataProps = {
    name: string;
    email: string;
    phone: string;
    password: string;
  };

  try {
    const data: dataProps = await req.json();

    response.status = 200;
    response.message = "Success";
    response.data = data;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
