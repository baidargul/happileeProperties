import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    // Parse the form data sent in the request
    const formData = await req.formData();

    const formValues: { [key: string]: any } = {};

    // Convert FormData into a JSON-like object for easier access
    formData.forEach((value, key) => {
      // If the key is "images", handle it differently (array of files)
      if (key === "images") {
        if (!formValues.images) formValues.images = [];
        formValues.images.push(value);
      } else {
        formValues[key] = value;
      }
    });

    console.log(`SERVER GOT DATA FROM USER`);
    console.log(formValues);
    console.log(`------`);

    let isExists: any;
    isExists = await prisma.user.findMany({
      where: {
        email: formValues.email,
      },
    });

    if (isExists.length > 0) {
      response.status = 400;
      response.message = "User with this email already exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.user.findMany({
      where: {
        phone: formValues.phone,
      },
    });

    if (isExists.length > 0) {
      response.status = 400;
      response.message = "User with this phone number already exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.user.create({
      data: {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        address: formValues.address,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "Failed to create user";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isExists = await prisma.builder.create({
      data: {
        userId: isExists.id,
        description: formValues.description,
        gst: formValues.gst,
      },
    });

    if (!isExists) {
      await prisma.user.delete({
        where: {
          id: isExists.id,
        },
      });

      response.status = 400;
      response.message = "Failed to create buyer";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const newBuyer = await prisma.builder.findUnique({
      where: {
        id: isExists.id,
      },
      include: {
        users: true,
      },
    });

    response.status = 200;
    response.message = "Success";
    response.data = newBuyer;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
