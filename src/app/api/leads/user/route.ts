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
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      response.status = 400;
      response.message = "Id not provided";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const leadsRaw = await prisma.leads.findMany({
      where: {
        userId: id,
      },
    });

    let leads = [];
    for (const lead of leadsRaw) {
      const property = await formatter.formattedProperty(lead.propertyId);
      leads.push(property);
    }
    const user = await formatter.formatUser(id);

    response.status = 200;
    response.message = "Success";
    response.data = { user: user, leads: leads };
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
