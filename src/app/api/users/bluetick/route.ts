import { NextRequest } from "next/server";
import { ImageHandler } from "../../../../../serveractions/Actions/partials/ImageHandler";
import prisma from "../../../../../serveractions/commands/prisma";
import { format } from "path";
import { formatter } from "../../../../../serveractions/Actions/partials/format";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    //form data

    const formData: any = await req.formData();

    const userId = formData.get("userId");
    let isExsits: any = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isExsits) {
      response.status = 400;
      response.message = "User does not exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const imageBlobs: Blob[] = [];
    const formValues: { [key: string]: any } = {};
    // Parse form data
    formData.forEach((value: any, key: any) => {
      if (key === "images" && value instanceof Blob) {
        if (ImageHandler.isValidImage(value)) {
          imageBlobs.push(value);
        }
      } else {
        formValues[key] = value;
      }
    });

    if (imageBlobs.length < 1) {
      response.status = 400;
      response.message = "Please upload atleast one image";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.bluetickDocuments.deleteMany({ where: { userId: userId } });

    // Save images and get URLs
    const imageUrls = await ImageHandler.saveImages(imageBlobs);

    for (const url of imageUrls) {
      const image = await prisma.image.create({
        data: {
          url: url,
          userId: userId,
        },
      });

      if (image) {
        await prisma.bluetickDocuments.create({
          data: {
            imageId: image.id,
            userId: userId,
          },
        });
      }
    }

    response.status = 200;
    response.message = "Success";
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

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (userId) {
      let isExsits: any = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!isExsits) {
        response.status = 400;
        response.message = "User does not exists";
        response.data = null;
        return new Response(JSON.stringify(response));
      }

      const images = await prisma.bluetickDocuments.findMany({
        where: {
          userId: userId,
        },
        include: {
          image: true,
        },
      });

      response.status = 200;
      response.message = "Success";
      response.data = images;
      return new Response(JSON.stringify(response));
    }

    const rawimages = await prisma.bluetickDocuments.findMany({
      include: {
        image: true,
        user: true,
      },
    });

    let users: any = [];
    for (const image of rawimages) {
      const user = await formatter.formatUser(image.userId);
      users.push({ user: user, image: image.image });
    }

    response.status = 200;
    response.message = "Success";
    response.data = users;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}

export async function PUT(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();
    if (!data.userId) {
      response.status = 400;
      response.message = "User Id not provided";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      response.status = 400;
      response.message = "User does not exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        bluetickVerified: !user.bluetickVerified,
      },
    });

    const formattedUser = await formatter.formatUser(data.userId);
    response.status = 200;
    response.message = "Success";
    response.data = formattedUser;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
