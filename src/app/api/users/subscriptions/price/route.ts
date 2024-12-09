import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";

export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

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

    if (!data.price) {
      response.status = 400;
      response.message = "Price is required.";
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
      response.status = 404;
      response.message = "Subscription not found.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const updatedSubscription = await prisma.subscription.update({
      where: {
        id: subscription.id,
      },
      data: {
        price: data.price,
      },
    });

    response.status = 200;
    response.message = "Subscription price updated successfully.";
    response.data = updatedSubscription;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
