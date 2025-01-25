import { NextRequest } from "next/server";
import prisma from "../../../../serveractions/commands/prisma";
import { SERVER_ACTIONS } from "../../../../serveractions/Actions/SERVER_ACTIONS";
import { ImageHandler } from "../../../../serveractions/Actions/partials/ImageHandler";
import { formatter } from "../../../../serveractions/Actions/partials/format";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const status = new URL(req.url).searchParams.get("status");
    const title = new URL(req.url).searchParams.get("title");
    const type = new URL(req.url).searchParams.get("type");
    const allotmentFor = new URL(req.url).searchParams.get("for");
    const minPrice = new URL(req.url).searchParams.get("minPrice");
    const maxPrice = new URL(req.url).searchParams.get("maxPrice");
    const price = new URL(req.url).searchParams.get("price");
    const allotmentType = new URL(req.url).searchParams.get("allotmentType");
    const ownership = new URL(req.url).searchParams.get("ownership");
    const bhk = new URL(req.url).searchParams.get("bhk");
    const minAge = new URL(req.url).searchParams.get("minAge");
    const maxAge = new URL(req.url).searchParams.get("maxAge");
    const age = new URL(req.url).searchParams.get("age");
    const minAvailableDate = new URL(req.url).searchParams.get("availableFrom");
    const maxAvailableDate = new URL(req.url).searchParams.get("availableUpto");
    const availableDate = new URL(req.url).searchParams.get("availableDate");
    const sortBy = new URL(req.url).searchParams.get("sortBy");

    const filters: any = {};
    let sortingOrder: any = {
      createdAt: "desc",
    };

    if (sortBy) {
      const sortOrder = sortBy.startsWith("-") ? "desc" : "asc";
      const sortField = sortBy.replace("-", "");
      sortingOrder = {
        [sortField]: sortOrder,
      };
    }

    if (title) filters.title = { contains: String(title), mode: "insensitive" };
    if (type) {
      filters.propertyType = {
        name: { contains: String(type), mode: "insensitive" },
      };
    }
    if (allotmentFor) {
      filters.allotmentFor = {
        name: { contains: String(allotmentFor), mode: "insensitive" },
      };
    }

    if (minPrice) {
      filters.price = { gte: Number(minPrice) };
      filters.rent = { gte: Number(minPrice) };
    }

    if (maxPrice) {
      if (minPrice) {
        filters.price = { gte: Number(minPrice), lte: Number(maxPrice) };
        filters.rent = { gte: Number(minPrice), lte: Number(maxPrice) };
      } else {
        filters.price = { lte: Number(maxPrice) };
        filters.rent = { lte: Number(maxPrice) };
      }
    }

    if (price) {
      filters.price = Number(price);
      filters.rent = Number(price);
    }

    if (allotmentType) {
      filters.propertyType.allotmentType = {
        name: { contains: String(allotmentType), mode: "insensitive" },
      };
    }

    if (ownership) {
      filters.ownershipType = {
        name: { contains: String(ownership), mode: "insensitive" },
      };
    }

    if (bhk) {
      filters.bhkType = {
        name: { contains: String(bhk), mode: "insensitive" },
      };
    }

    if (minAge) filters.age = { gte: Number(minAge) };
    if (maxAge) {
      if (minAge) filters.age = { gte: Number(minAge), lte: Number(maxAge) };
      else filters.age = { lte: Number(maxAge) };
    }

    if (age) {
      filters.age = Number(age);
    }

    if (minAvailableDate)
      filters.availableDate = { gte: new Date(minAvailableDate) };
    if (maxAvailableDate) {
      if (minAvailableDate)
        filters.availableDate = {
          gte: new Date(minAvailableDate),
          lte: new Date(maxAvailableDate),
        };
      else filters.availableDate = { lte: new Date(maxAvailableDate) };
    }

    if (availableDate) {
      filters.availableDate = new Date(availableDate);
    }

    if (status) {
      filters.status = String(status);
    }

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
      where: {
        ...filters,
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

    if (!userId) {
      response.status = 400;
      response.message = "User id is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let user: any = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      response.status = 400;
      response.message = "User does not exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    user = await formatter.formatUser(user.id);

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

    let temp: any = formData.get(`bhk`);
    const bhkType = await prisma.bhk.findUnique({
      where: {
        id: temp,
      },
    });
    temp = null;

    // if (!bhkType) {
    //   response.status = 400;
    //   response.message = "Invalid bhkType";
    //   response.data = null;
    //   return new Response(JSON.stringify(response));
    // }

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

    const counter: any = await SERVER_ACTIONS.subscriptions.increaseValue(
      user.subscription.name,
      user.type,
      "Number of Listings",
      user.id,
      1
    );

    if (counter.status !== 200) {
      response.status = counter.status;
      response.message = counter.message;
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
        bhkTypeId: bhkType?.id || null,
        furnishingId: furnishing.id,
        ownershipTypeId: ownership.id,
        allotmentForId: allotmentFor.id,
        userId: userId,
        description: formData.get(`description`) || "",
        builtupArea: formData.get(`builtupArea`) || "",
        carpetArea: formData.get(`carpetArea`) || "",
        floorNumber: formData.get(`floorNumber`) || "",
        totalFloorsInBuilding: formData.get(`totalFloorsInBuilding`) || "",
        facingDirection: formData.get(`facingDirection`) || "",
        parkingSpace: formData.get(`parkingSpace`) || "",
        builderId: formData.get(`builderId`) || "",
      },
    });

    const amenitiesRAW: { id: string; name: string }[] | null = JSON.parse(
      formData.get(`amenities`)
    );

    if (amenitiesRAW) {
      for (const item of amenitiesRAW) {
        const isValid = await prisma.amenities.findFirst({
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
          userId: userId,
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
