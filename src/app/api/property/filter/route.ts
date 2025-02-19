import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { formatter } from "../../../../../serveractions/Actions/partials/format";
import { SERVER_ACTIONS } from "../../../../../serveractions/Actions/SERVER_ACTIONS";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    const formatted = await SERVER_ACTIONS.properties.filter(data);

    response.status = 200;
    response.message = `Found ${formatted.length} properties.`;
    response.data = formatted;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
