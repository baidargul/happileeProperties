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
      response.message = "Account type is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExist: any = await prisma.subscription.findFirst({
      where: {
        name: data.subscriptionName,
        accountType: data.type,
      },
    });

    if (!isExist) {
      response.status = 400;
      response.message = "Subscription not found.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.subscription.update({
      where: {
        id: isExist.id,
      },
      data: {
        isPopular: true,
      },
    });

    await prisma.subscription.updateMany({
      where: {
        name: {
          not: data.subscriptionName,
        },
        accountType: data.type,
      },
      data: {
        isPopular: false,
      },
    });

    response.status = 200;
    response.message = "Subscription updated successfully.";
    response.data = null;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
