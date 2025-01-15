import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";
import { formatter } from "../../../../../../serveractions/Actions/partials/format";

export async function POST(req: NextRequest) {
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

    if (!data.amenitiesIds || data.amenitiesIds.length === 0) {
      response.status = 400;
      response.message = "Amenities Ids not provided";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.location) {
      response.status = 400;
      response.message = "Location is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.maxBudget) {
      response.status = 400;
      response.message = "Max budget is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.minBudget) {
      response.status = 400;
      response.message = "Min budget is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.propertyTypeIds || data.propertyTypeIds.length === 0) {
      response.status = 400;
      response.message = "Property type ids is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    let isExits: any = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!isExits) {
      response.status = 400;
      response.message = "User does not exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.userPreferences.deleteMany({
      where: {
        userId: data.userId,
      },
    });

    let isGood: boolean = true;
    for (const amenity of data.amenitiesIds) {
      let temp = await prisma.amenities.findUnique({
        where: {
          id: amenity,
        },
      });
      if (!temp) {
        isGood = false;
        break;
      }
    }

    if (!isGood) {
      response.status = 400;
      response.message = "Amenity does not exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    isGood = true;

    for (const propertyType of data.propertyTypeIds) {
      let temp = await prisma.propertyType.findUnique({
        where: {
          id: propertyType,
        },
      });
      if (!temp) {
        isGood = false;
        break;
      }
    }

    if (!isGood) {
      response.status = 400;
      response.message = "Property type does not exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await prisma.userPreferences.create({
      data: {
        userId: data.userId,
        location: data.location,
        maxBudget: Number(data.maxBudget),
        minBudget: Number(data.minBudget),
      },
    });

    await prisma.amenitiesPreferences.deleteMany({
      where: {
        userId: data.userId,
      },
    });

    await prisma.propertyTypePreferences.deleteMany({
      where: {
        userId: data.userId,
      },
    });

    for (const amenity of data.amenitiesIds) {
      await prisma.amenitiesPreferences.create({
        data: {
          userId: data.userId,
          amenitiesId: amenity.id,
        },
      });
    }

    for (const propertyType of data.propertyTypeIds) {
      await prisma.propertyTypePreferences.create({
        data: {
          userId: data.userId,
          propertyTypeId: propertyType.id,
        },
      });
    }

    let user = await formatter.formatUser(data.userId);

    response.status = 200;
    response.message = "Preferences updated successfully";
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
