import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { SERVER_ACTIONS } from "../../../../../serveractions/Actions/SERVER_ACTIONS";

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

export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.id) {
      response.status = 400;
      response.message = "Property id is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.status) {
      response.status = 400;
      response.message = "Status is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const property = await prisma.property.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });

    const final = await SERVER_ACTIONS.formatter.formattedProperty(data.id);

    response.status = 200;
    response.message = "Property status updated successfully.";
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
