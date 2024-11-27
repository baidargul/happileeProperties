import { NextRequest } from "next/server";
import prisma from "../../../../serveractions/commands/prisma";
import { SERVER_ACTIONS } from "../../../../serveractions/Actions/SERVER_ACTIONS";
import { ImageHandler } from "../../../../serveractions/Actions/partials/ImageHandler";

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

    const userId = formData.get(`userId`);
    if (userId) {
      response.status = 400;
      response.message = "User id is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

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

    let temp = formData.get(`bhk`);
    const bhkType = await prisma.bhk.findUnique({
      where: {
        id: temp,
      },
    });
    temp = null;

    if (!bhkType) {
      response.status = 400;
      response.message = "Invalid bhkType";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    temp = formData.get(`allotmentFor`);
    const allotmentFor = await prisma.allotmentFor.findUnique({
      where: {
        id: formData.get(`allotmentFor`),
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
        availableDate: new Date(formData.get(`availableDate`)).toISOString(),
        area: Number(formData.get(`area`)),
        price: Number(formData.get(`price`)),
        rent: Number(formData.get(`price`)),
        maintenance: Number(formData.get(`maintenance`)),
        title: formData.get(`title`),
        propertyTypeId: propertyType.id,
        bhkTypeId: bhkType.id,
        furnishingId: furnishing.id,
        ownershipTypeId: ownership.id,
        allotmentForId: allotmentFor.id,
      },
    });

    const amenitiesRAW: { id: string; name: string }[] | null = JSON.parse(
      formData.get(`amenities`)
    );

    if (amenitiesRAW) {
      for (const item of amenitiesRAW) {
        const isValid = await prisma.amenities.findUnique({
          where: {
            name: item.name,
          },
        });

        if (isValid) {
          const entry = await prisma.amenitiesregister.create({
            data: {
              propertyId: property.id,
              amentitiesId: isValid.id,
            },
          });
        }
      }
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

    // Save images and get URLs
    const imageUrls = await ImageHandler.saveImages(imageBlobs);

    for (const url of imageUrls) {
      const image = await prisma.image.create({
        data: {
          url: url,
          userId: "1",
        },
      });

      if (image) {
        await prisma.propertyImages.create({
          data: {
            imageId: image.id,
            propertyId: property.id,
          },
        });
      }
    }

    const final = await SERVER_ACTIONS.formatter.formattedProperty(property.id);

    response.status = 200;
    response.message = "Property created successfully";
    response.data = final;
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
