import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    let structure: any = await prisma.allotmentType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    let allotmentFor: any = await prisma.allotmentFor.findMany({
      orderBy: {
        name: "asc",
      },
    });

    let propertyType: any = await prisma.propertyType.findMany({
      include: {
        allotmentType: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const final = {
      allotmentType: structure,
      lookingFor: {
        allotmentFor,
        propertyType,
      },
    };

    response.status = 200;
    response.message = "Success";
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
