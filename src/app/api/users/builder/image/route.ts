import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";
import { promises as fs } from "fs"; // Use the file system promises API
import path from "path"; // Path utility

export async function DELETE(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data) {
      response.status = 400;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const image = await prisma.image.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!image) {
      response.status = 400;
      response.message = "No image found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.image.delete({
      where: {
        id: data.id,
      },
    });

    const images = await prisma.image.findMany({
      where: {
        userId: image.userId,
      },
      include: {
        user: {
          include: {
            builder: true,
          },
        },
      },
    });

    response.status = 200;
    response.message = "Success";
    response.data = images;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
