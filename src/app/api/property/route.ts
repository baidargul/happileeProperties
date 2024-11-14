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
        furnishing: true,
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
          furnishing: {
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
    const formData: any = await req.formData();

    console.log(`CREATE PROPERTY API EXECUTION`);
    console.log(`-------------------||`);
    console.log(formData);
    console.log(`-------------------||`);

    const furnishing = await prisma.furnishing.findUnique({
      where: {
        id: formData.get(`furnishing`),
      },
    });

    if (!furnishing) {
      response.status = 400;
      response.message = "Invalid furnishing";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const ownership = await prisma.ownershipType.findUnique({
      where: {
        id: formData.get(`ownerShipType`),
      },
    });

    if (!ownership) {
      response.status = 400;
      response.message = "Invalid ownerShipType";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const allotmentType = await prisma.allotmentType.findUnique({
      where: {
        id: formData.get(`allotmentType`),
      },
    });

    if (!allotmentType) {
      response.status = 400;
      response.message = "Invalid allotmentType";
      response.data = null;
      return new Response(JSON.stringify(response));
    }
    console.log(`Executed`);

    const propertyType = await prisma.propertyType.findUnique({
      where: {
        id: formData.get(`propertyType`),
      },
    });

    if (!propertyType) {
      response.status = 400;
      response.message = "Invalid propertyType";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const bhkType = await prisma.bhk.findUnique({
      where: {
        id: formData.get(`bhkType`),
      },
    });

    if (!bhkType) {
      response.status = 400;
      response.message = "Invalid bhkType";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const allotmentFor = await prisma.allotmentFor.findUnique({
      where: {
        id: formData.get(`allotmentFor.id`),
      },
    });

    if (!allotmentFor) {
      response.status = 400;
      response.message = "Invalid allotmentFor";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const property = await prisma.property.create({
      data: {
        age: formData.get(`propertyAge`),
        availableDate: formData.get(`availableDate`),
        area: Number(formData.get(`area`)),
        price: Number(formData.get(`price`)),
        rent: Number(formData.get(`rent`)),
        maintenance: Number(formData.get(`maintenance`)),
        title: formData.get(`title`),
        propertyTypeId: propertyType.id,
        bhkTypeId: bhkType.id,
        furnishingId: furnishing.id,
        ownershipTypeId: ownership.id,
        allotmentForId: allotmentFor.id,
      },
    });

    response.status = 200;
    response.message = "In development";
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

function validateData(formData: any) {
  let isValid = true;

  if (!formData.title) {
    isValid = false;
  }

  return isValid;
}
