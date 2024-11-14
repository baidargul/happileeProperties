import { NextRequest } from "next/server";
import prisma from "../../../../serveractions/commands/prisma";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    let property: any = await prisma.property.findMany({
      include: {
        propertyType: {
          include: {
            allotmentType: true,
          },
        },
        bhkType: true,
        finishing: true,
        ownershipType: true,
        propertyImages: {
          include: {
            image: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          title: "asc",
        },
        {
          propertyType: {
            name: "asc",
          },
        },
        {
          bhkType: {
            name: "asc",
          },
        },
        {
          finishing: {
            name: "asc",
          },
        },
      ],
    });

    response.status = 200;
    response.message =
      property.length > 0
        ? `Found ${property.length} properties`
        : "No properties found";
    response.data = property;
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

  try {
    const formData = await req.formData();

    console.log(`CREATE PROPERTY API EXECUTION`);
    console.log(`-------------------||`);
    console.log(formData);
    console.log(`-------------------||`);

    response.status = 200;
    response.message = "In development";
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
