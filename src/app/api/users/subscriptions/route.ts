import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { accountTypes } from "@prisma/client";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const types: any = [
      "UNDEFINED",
      "BUYER",
      "SELLER",
      "BUILDER",
      "AGENT",
      "ADMIN",
      "SUPERADMIN",
    ];

    let subscriptions: any = [];

    for (const type of types) {
      const subModel: any = await prisma.subscription.findMany({
        where: {
          accountType: type,
        },
        include: {
          subscriptionDetails: true,
        },
      });

      if (subModel.length > 0) {
        const grouped: any = {
          name: type,
          subscriptions: {},
        };

        for (const sub of subModel) {
          if (!grouped.subscriptions[sub.name]) {
            grouped.subscriptions[sub.name] = {
              id: sub.id,
              type: sub.accountType,
              price: sub.price || 0,
              properties: {},
            };
          }

          for (const plan of sub.subscriptionDetails) {
            grouped.subscriptions[sub.name].properties[plan.label] = {
              id: plan.id,
              limit: plan.value,
            };
          }
        }

        subscriptions.push(grouped);
      }
    }

    response.status = 200;
    response.message = "Subscriptions fetched successfully";
    response.data = subscriptions;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  // Define the valid accountTypes
  const validAccountTypes = [
    "UNDEFINED",
    "BUYER",
    "SELLER",
    "BUILDER",
    "AGENT",
    "ADMIN",
    "SUPERADMIN",
  ];

  try {
    let data = await req.json();

    // Validate required fields
    if (!data.name) {
      response.status = 400;
      response.message = "Name is required.";
      return new Response(JSON.stringify(response));
    }

    if (!data.type) {
      response.status = 400;
      response.message = "Type is required.";
      return new Response(JSON.stringify(response));
    }

    // Validate the type against allowed accountTypes
    if (!validAccountTypes.includes(data.type)) {
      response.status = 400;
      response.message = `Invalid accountType. Allowed values are: ${validAccountTypes.join(
        ", "
      )}`;
      return new Response(JSON.stringify(response));
    }

    // Set default price if not provided
    if (!data.price) {
      data = { ...data, price: 0 };
    }

    // Create the subscription using Prisma
    const subscription = await prisma.subscription.create({
      data: {
        name: data.name,
        accountType: data.type, // Validated type
        price: data.price,
      },
    });

    response.status = 200;
    response.message = "Subscription created successfully";
    response.data = subscription;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.error("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response));
  }
}

export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    let data = await req.json();

    if (!data.id) {
      response.status = 400;
      response.message = "UserId is required.";
      return new Response(JSON.stringify(response));
    }

    if (!data.subscriptionName) {
      response.status = 400;
      response.message = "Subscription name is required.";
      return new Response(JSON.stringify(response));
    }

    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
      include: {
        subscriptionRegister: true,
      },
    });

    if (!user) {
      response.status = 400;
      response.message = "User does not exist.";
      return new Response(JSON.stringify(response));
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        name: data.subscriptionName,
        accountType: user.type,
      },
    });

    if (!subscription) {
      response.status = 400;
      response.message =
        "Subscription does not exist or does not belong to the user type.";
      return new Response(JSON.stringify(response));
    }

    const details = await prisma.subscriptionDetails.findMany({
      where: {
        subscriptionId: subscription.id,
      },
    });

    await prisma.subscriptionRegister.deleteMany({
      where: {
        userId: user.id,
      },
    });

    for (const item of details) {
      await prisma.subscriptionRegister.create({
        data: {
          userId: user.id,
          detaildId: item.id,
          value: 0,
        },
      });
    }

    response.status = 200;
    response.message = "Subscription updated successfully";
    response.data = null;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.error("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response));
  }
}
