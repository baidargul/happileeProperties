import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.name) {
      response.status = 400;
      response.message = "Name is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.limit) {
      response.status = 400;
      response.message = "Limit is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.subscriptionName) {
      response.status = 400;
      response.message = "Subscription name is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.type) {
      response.status = 400;
      response.message = "Type is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        name: data.subscriptionName,
        accountType: data.type,
      },
    });

    if (!subscription) {
      response.status = 400;
      response.message = "Subscription not found.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const property = await prisma.subscriptionDetails.create({
      data: {
        label: data.name,
        value: Number(data.limit),
        subscriptionId: subscription.id,
      },
    });

    if (!property) {
      response.status = 400;
      response.message = "Property not created.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    response.status = 200;
    response.message = "Property created successfully";
    response.data = property;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
