import { accountTypes } from "@prisma/client";
import prisma from "../../commands/prisma";

async function increaseValue(
  subscriptionName: string,
  type: accountTypes,
  propertyName: string,
  userId: string,
  value: number
) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      type: type,
    },
  });

  if (!user) {
    response.status = 400;
    response.message = "User not found.";
    return response;
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      name: subscriptionName,
      accountType: type,
    },
  });

  if (!subscription) {
    response.status = 400;
    response.message = "Subscription not found.";
    return response;
  }

  const property = await prisma.subscriptionDetails.findFirst({
    where: {
      label: propertyName,
      subscriptionId: subscription.id,
    },
  });

  if (!property) {
    response.status = 400;
    response.message = "Subscription property not found.";
    return response;
  }

  let valueRegister = await prisma.subscriptionRegister.findFirst({
    where: {
      detaildId: property.id,
    },
  });

  if (!valueRegister) {
    valueRegister = await prisma.subscriptionRegister.create({
      data: {
        detaildId: property.id,
        value: value,
        userId: userId,
      },
    });
  } else {
    const newValue = Number(valueRegister.value) + Number(value);
    if (newValue >= Number(property.value)) {
      response.status = 400;
      response.message = `${property.label} cannot be increased. Limit is ${property.value}.`;
      return response;
    } else {
      valueRegister = await prisma.subscriptionRegister.update({
        where: {
          id: valueRegister.id,
        },
        data: {
          value: newValue,
        },
      });
    }
  }
}

export const subscriptions = {
  increaseValue,
};
