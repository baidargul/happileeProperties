import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { SERVER_ACTIONS } from "../../../../../serveractions/Actions/SERVER_ACTIONS";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      response.status = 400;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const property = await prisma.property.findUnique({
      where: {
        id: id,
      },
    });

    if (!property) {
      response.status = 400;
      response.message = "Property not found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const final = SERVER_ACTIONS.formatter.formattedProperty(property.id);

    response.status = 200;
    response.message = "Property found";
    response.data = final;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
