import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { accountStatus, accountTypes } from "@prisma/client";

export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data: { id: string; type: accountTypes } = await req.json();

    if (!data.id) {
      response.status = 400;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.type) {
      response.status = 400;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExists: any = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "No user exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (
      !(
        data.type === accountTypes.UNDEFINED ||
        data.type === accountTypes.SUPERADMIN ||
        data.type === accountTypes.BUYER ||
        data.type === accountTypes.BUILDER ||
        data.type === accountTypes.AGENT ||
        data.type === accountTypes.ADMIN
      )
    ) {
      response.status = 400;
      response.message = "Please provide valid type";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        type: data.type,
        status:
          data.type === accountTypes.UNDEFINED
            ? accountStatus.UNDEFINED
            : accountStatus.INCOMPLETE,
        updatedAt: new Date(),
      },
      include: {
        builder: true,
        image: data.type === accountTypes.BUILDER ? true : false,
      },
    });

    response.status = 200;
    response.message = "User type changed successfully";
    response.data = user;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
