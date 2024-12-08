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
      "BUILDER",
      "AGENT",
      "ADMIN",
      "SUPERADMIN",
    ];

    let subscriptions: any = [];

    for (const type of types) {
      const subModel = await prisma.subscription.findMany({
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
