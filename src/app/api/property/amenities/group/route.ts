import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data: any = await req.json();

    if (!data.name) {
      response.status = 400;
      response.message = "Name is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const isExists = await prisma.amenitiesGroup.findFirst({
      where: {
        name: data.name,
      },
    });

    if (isExists) {
      response.status = 400;
      response.message = "Amenity group already exists.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const amenityGroup = await prisma.amenitiesGroup.create({
      data: {
        name: data.name,
      },
      include: {
        amenities: true,
      },
    });

    response.status = 200;
    response.message = "Amenity group created successfully.";
    response.data = amenityGroup;
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
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const amenityGroup = await prisma.amenitiesGroup.findUnique({
        where: {
          id: id,
        },
        include: {
          amenities: {
            orderBy: {
              name: "asc",
            },
          },
        },
      });

      response.status = 200;
      response.message = "Amenity group fetched successfully.";
      response.data = amenityGroup;
      return new Response(JSON.stringify(response));
    } else {
      const amenityGroups = await prisma.amenitiesGroup.findMany({
        include: {
          amenities: {
            orderBy: {
              name: "asc",
            },
          },
        },
      });

      response.status = 200;
      response.message = "Amenity groups fetched successfully.";
      response.data = amenityGroups;
      return new Response(JSON.stringify(response));
    }
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
export async function DELETE(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      response.status = 400;
      response.message = "Id is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const amenityGroup = await prisma.amenitiesGroup.delete({
      where: {
        id: id,
      },
    });

    response.status = 200;
    response.message = "Amenity group deleted successfully.";
    response.data = amenityGroup;
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
    const data: any = await req.json();

    if (!data.id) {
      response.status = 400;
      response.message = "Id is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.name) {
      response.status = 400;
      response.message = "Name is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const amenityGroup = await prisma.amenitiesGroup.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
      include: {
        amenities: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    response.status = 200;
    response.message = "Amenity group updated successfully.";
    response.data = amenityGroup;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
