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
    const id = new URL(req.url).searchParams.get("id");

    if (!id) {
      response.status = 400;
      response.message = "Invalid request, id is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      response.status = 400;
      response.message = "User not found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const userData: any = await formatter.formatUser(user.id);

    let propertyTypeIds = [];
    let amenitiesIds = [];
    const preferences = userData.preferences;
    const minPrice = preferences.minBudget;
    const maxPrice = preferences.maxBudget;
    const location = preferences.location;

    userData.preferences.propertyTypePreference.map((item: any) => {
      propertyTypeIds.push(item.id);
    });

    userData.preferences.amenityPreference.map((item: any) => {
      amenitiesIds.push(item.amenitiesId);
    });

    response.status = 200;
    response.message = "User found";
    response.data = preferences;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
