import { NextRequest } from "next/server";
import prisma from "../../../../serveractions/commands/prisma";
import { format } from "path";
import { formatter } from "../../../../serveractions/Actions/partials/format";

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

    await prisma.leads.create({
      data: {
        propertyId: data.propertyId,
        userId: data.userId,
      },
    });

    response.status = 200;
    response.message = "Lead created successfully";
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

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const leadsRaw = await prisma.leads.findMany({
      include: {
        property: {
          include: {
            propertyType: true,
          },
        },
        user: {
          include: {
            agent: true,
            builder: true,
            image: true,
            buyer: true,
          },
        },
      },
    });

    let leads: any = [];
    for (const lead of leadsRaw) {
      const prop: any = await formatter.formattedProperty(lead.propertyId);
      const usr: any = await formatter.formatUser(lead.userId);
      leads.push({ property: prop, user: usr });
    }

    response.status = 200;
    response.message = "Leads fetched successfully";
    response.data = leads;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
