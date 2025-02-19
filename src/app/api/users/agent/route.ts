import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { accountStatus, accountTypes, user } from "@prisma/client";
import { ImageHandler } from "../../../../../serveractions/Actions/partials/ImageHandler";

// FOR JSON
// export async function POST(req: NextRequest) {
//   const response = {
//     status: 500,
//     message: "Internal Server Error",
//     data: null as any,
//   };

//   try {
//     const data = await req.json();

//     if (!data.id) {
//       response.status = 404;
//       response.message = "Invalid request";
//       response.data = null;
//       return new Response(JSON.stringify(response));
//     }

//     if (!data.rera) {
//       response.status = 400;
//       response.message = "Rera is required";
//       response.data = null;
//       return new Response(JSON.stringify(response));
//     }

//     let isExists: user | null = await prisma.user.findUnique({
//       where: {
//         id: data.id,
//       },
//     });

//     if (!isExists) {
//       response.status = 404;
//       response.message = "User doesn't exists!";
//       response.data = null;
//       return new Response(JSON.stringify(response));
//     }

//     if (isExists.type !== accountTypes.AGENT) {
//       response.status = 400;
//       response.message = `User is '${isExists.type}'. Please change type before creating agent.`;
//       response.data = null;
//       return new Response(JSON.stringify(response));
//     }

//     const user = await prisma.agent.create({
//       data: {
//         userId: data.id,
//         rera: data.rera,
//         description: data.description ? data.description : "",
//         experience: data.experience ? Number(data.experience).toFixed(0) : 0,
//       },
//     });

//     await prisma.user.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         status: accountStatus.PENDING,
//       },
//     });

//     const finalUser = await prisma.user.findUnique({
//       where: {
//         id: data.id,
//       },
//       include: {
//         agent: true,
//       },
//       omit: {
//         password: true,
//       },
//     });

//     response.status = 200;
//     response.message = "Agent created";
//     response.data = finalUser;
//     return new Response(JSON.stringify(response));
//   } catch (error: any) {
//     console.log("[SERVER ERROR]: " + error.message);
//     response.status = 500;
//     response.message = error.message;
//     response.data = null;
//     return new Response(JSON.stringify(response));
//   }
// }

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data: any = await req.formData();

    if (!data.get(`id`)) {
      response.status = 404;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.get(`rera`)) {
      response.status = 400;
      response.message = "Rera is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.get(`businessName`)) {
      response.status = 400;
      response.message = "Business name is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    console.log(data);

    let isExists: user | null = await prisma.user.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!isExists) {
      response.status = 404;
      response.message = "User doesn't exists!";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (isExists.type !== accountTypes.AGENT) {
      response.status = 400;
      response.message = `User is '${isExists.type}'. Please change type before creating agent.`;
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const imageBlobs: Blob[] = [];
    const formValues: { [key: string]: any } = {};
    // Parse form data
    data.forEach((value: any, key: any) => {
      if (key === "images" && value instanceof Blob) {
        if (ImageHandler.isValidImage(value)) {
          imageBlobs.push(value);
        }
      } else {
        formValues[key] = value;
      }
    });

    // Save images and get URLs
    const imageUrls = await ImageHandler.saveImages(imageBlobs);

    let lastImageUrl = "";
    for (const url of imageUrls) {
      const image = await prisma.image.create({
        data: {
          url: url,
          userId: data.get(`id`),
        },
      });

      if (image) {
        lastImageUrl = image.url;
      }
    }

    const isAlreadyThat = await prisma.agent.findFirst({
      where: {
        userId: data.get(`id`),
      },
    });

    if (isAlreadyThat) {
      response.status = 400;
      response.message = "This user is already an agent";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await prisma.agent.create({
      data: {
        userId: data.get(`id`),
        rera: data.get(`rera`),
        rera_link: lastImageUrl,
        description: data.get(`description`) ? data.get(`description`) : "",
        experience: data.get(`experience`)
          ? Number(data.get(`experience`)).toFixed(0)
          : 0,
        businessName: data.get(`businessName`) ? data.get(`businessName`) : "",
      },
    });

    await prisma.user.update({
      where: {
        id: data.get(`id`),
      },
      data: {
        status: accountStatus.PENDING,
      },
    });

    const finalUser = await prisma.user.findUnique({
      where: {
        id: data.get(`id`),
      },
      include: {
        agent: true,
      },
    });

    response.status = 200;
    response.message = "Agent created";
    response.data = finalUser;
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
    data: null,
  };

  try {
    const users: any = await prisma.user.findMany({
      where: {
        type: accountTypes.AGENT,
      },
      orderBy: {
        name: "asc",
      },
      include: {
        agent: true,
      },
    });

    if (users.length < 1) {
      response.status = 200;
      response.message = "No agents found";
      return new Response(JSON.stringify(response));
    }

    response.status = 200;
    response.message = `Found (${users.length}) agents`;
    response.data = users;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    return new Response(JSON.stringify(response));
  }
}
