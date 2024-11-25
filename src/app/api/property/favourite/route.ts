import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { formatter } from "../../../../../serveractions/Actions/partials/format";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      response.status = 400;
      response.message =
        "User id not provided or is null to find favourite listings";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      response.status = 400;
      response.message = "User doesn't exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const favouriteListings = await prisma.favouriteProperties.findMany({
      where: {
        userId: userId,
      },
      include: {
        property: true,
      },
    });

    const properties: any[] = [];

    for (const item of favouriteListings) {
      const property = await formatter.formattedProperty(item.propertyId);
      properties.push(property);
    }

    const final = {
      user: user,
      favouriteProperties: properties,
    };

    response.status = 200;
    response.message = `Found ${properties.length} favourite properties`;
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

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.propertyId) {
      response.status = 400;
      response.message = "Property Id not provided";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.userId) {
      response.status = 400;
      response.message = "User Id not provided";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const property = await prisma.property.findUnique({
      where: {
        id: data.propertyId,
      },
    });

    if (!property) {
      response.status = 400;
      response.message = "Property not found";
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
      response.message = "User not found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const favourite = await prisma.favouriteProperties.create({
      data: {
        propertyId: data.propertyId,
        userId: data.userId,
      },
    });

    response.status = 200;
    response.message = "Property added to favourites";
    response.data = favourite;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}

export async function PATCH(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.propertyId) {
      response.status = 400;
      response.message = "Property Id not provided";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.userId) {
      response.status = 400;
      response.message = "User Id not provided";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const favourite = await prisma.favouriteProperties.deleteMany({
      where: {
        propertyId: data.propertyId,
        userId: data.userId,
      },
    });

    response.status = 200;
    response.message = "Property removed from favourites";
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
