import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (data.id) {
      const amenities = await prisma.amenities.findMany({
        where: {
          id: data.id,
        },
        include: {
          amenitiesGroup: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      response.status = 200;
      response.message = "Amenity fetched successfully.";
      response.data = amenities;
      return new Response(JSON.stringify(response));
    } else {
      const amenities = await prisma.amenities.findMany({
        include: {
          amenitiesGroup: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      response.status = 200;
      response.message = "Amenities fetched successfully.";
      response.data = amenities;
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
export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.name) {
      response.status = 400;
      response.message = "Name is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.groupName) {
      response.status = 400;
      response.message = "Group name is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const group = await prisma.amenitiesGroup.findFirst({
      where: {
        name: data.groupName,
      },
    });

    if (!group) {
      response.status = 400;
      response.message = "Group does not exist.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const isExists = await prisma.amenities.findFirst({
      where: {
        name: data.name,
        groupId: group.id,
      },
    });

    if (isExists) {
      response.status = 400;
      response.message = "Amenity already exists in this group";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const amenities = await prisma.amenities.create({
      data: {
        name: data.name,
        groupId: group.id,
      },
    });

    response.status = 200;
    response.message = "Amenity created successfully.";
    response.data = amenities;
    return new Response(JSON.stringify(response));
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

    const amenities = await prisma.amenities.delete({
      where: {
        id: id,
      },
    });

    response.status = 200;
    response.message = "Amenity deleted successfully.";
    response.data = amenities;
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

    if (!data.id) {
      response.status = 400;
      response.message = "Id is required.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const updated = await prisma.amenities.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });

    response.status = 200;
    response.message = "Amenity updated successfully.";
    response.data = updated;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
