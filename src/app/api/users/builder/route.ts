import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { promises as fs } from "fs"; // Use the file system promises API
import path from "path"; // Path utility

// Define a directory in the public folder to store uploaded images
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

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
    const imageUrls: any[] = []; // Store image URLs

    // Convert FormData into a JSON-like object for easier access
    formData.forEach((value, key) => {
      // Handle files (Blobs instead of File)
      if (key === "images" && value instanceof Blob) {
        imageUrls.push(value); // Store the images to save them later
      } else {
        formValues[key] = value;
      }
    });

    // Check for existing user by email or phone number
    let isExists: any;

    // isExists = await prisma.user.findMany({
    //   where: { email: formValues.email },
    // });

    // if (isExists.length > 0) {
    //   response.status = 400;
    //   response.message = "User with this email already exists";
    //   return new Response(JSON.stringify(response));
    // }

    // isExists = await prisma.user.findMany({
    //   where: { phone: formValues.phoneNumber },
    // });

    // if (isExists.length > 0) {
    //   response.status = 400;
    //   response.message = "User with this phone number already exists";
    //   return new Response(JSON.stringify(response));
    // }

    isExists = await prisma.user.findUnique({
      where: {
        id: formValues.id,
      },
    });

    if (!isExists) {
      response.status = 400;
      response.message = "User not found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    // Create a new user
    // const newUser = await prisma.user.create({
    //   data: {
    //     name: formValues.name,
    //     email: formValues.email,
    //     phone: formValues.phoneNumber,
    //     address: formValues.address,
    //     password: formValues.password,
    //   },
    // });

    // if (!newUser) {
    //   response.status = 400;
    //   response.message = "Failed to create user";
    //   return new Response(JSON.stringify(response));
    // }

    // Save the images to the server and generate URLs
    if (imageUrls.length > 0) {
      await fs.mkdir(UPLOAD_DIR, { recursive: true }); // Ensure the upload directory exists

      const savedImageUrls: string[] = [];

      for (const image of imageUrls) {
        const fileName = `${Date.now()}-${Math.random().toString(36)}.png`; // Unique file name
        const filePath = path.join(UPLOAD_DIR, fileName);
        const arrayBuffer = await image.arrayBuffer(); // Blob to ArrayBuffer
        const buffer: any = Buffer.from(arrayBuffer);

        // Write the image to the file system
        await fs.writeFile(filePath, buffer);

        // Generate the URL to be stored in the database
        const imageUrl = `/uploads/${fileName}`;
        savedImageUrls.push(imageUrl);
      }

      // Now you have `savedImageUrls` which contain the URLs of the uploaded images
      formValues.images = savedImageUrls; // Store these URLs in the formValues
    }

    const isAlreadyThat = await prisma.builder.findFirst({
      where: {
        userId: isExists.id,
      },
    });

    if (isAlreadyThat) {
      response.status = 400;
      response.message = "This user is already a builder";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    // Create builder related to user, including image URLs in the DB if necessary
    const newBuilder = await prisma.builder.create({
      data: {
        userId: isExists.id,
        description: formValues.description,
        gst: formValues.gst,
        // images: formValues.images, // Store image URLs in the builder record
      },
    });

    if (!newBuilder) {
      await prisma.user.delete({ where: { id: isExists.id } });
      response.status = 400;
      response.message = "Failed to create builder";
      return new Response(JSON.stringify(response));
    }
    const dataImages = formValues.images;
    console.log(dataImages);

    formValues.images.forEach(async (item: any) => {
      await prisma.image.create({
        data: {
          userId: isExists.id,
          url: item,
        },
      });
    });

    await prisma.user.update({
      where: {
        id: isExists.id,
      },
      data: {
        status: "PENDING",
      },
    });

    const user = await prisma.builder.findUnique({
      where: {
        id: newBuilder.id,
      },
      include: {
        user: {
          include: {
            image: true,
          },
          omit: {
            password: true,
          },
        },
      },
    });

    const actUser = await prisma.user.findUnique({
      where: {
        id: user?.userId,
      },
      include: {
        builder: true,
        image: true,
      },
      omit: {
        password: true,
      },
    });

    response.status = 200;
    response.message = "Success";
    // response.data = { newUser, newBuilder, dataImages };
    response.data = actUser;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response));
  }
}

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null,
  };

  try {
    const builder: any = await prisma.builder.findMany({
      include: {
        user: {
          include: {
            image: true,
          },
        },
      },
    });

    if (!builder) {
      response.status = 200;
      response.message = "No builders found";
      return new Response(JSON.stringify(response));
    }

    response.status = 200;
    response.message = "Success";
    response.data = builder;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response));
  }
}

export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null,
  };

  try {
    const data = await req.json();

    const builder: any = await prisma.builder.findUnique({
      where: {
        id: data.id,
      },
      include: {
        user: {
          include: {
            image: true,
          },
        },
      },
    });

    if (!builder) {
      response.status = 400;
      response.message = "No builders found";
      return new Response(JSON.stringify(response));
    }

    response.status = 200;
    response.message = "Success";
    response.data = builder;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response));
  }
}
