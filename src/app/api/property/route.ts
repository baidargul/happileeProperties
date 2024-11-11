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
      ],
    });
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
