import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";
import { formatter } from "../../../../../serveractions/Actions/partials/format";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    let filters: any = {};

    if (data.minPrice && data.maxPrice) {
      filters.price = {
        gte: Number(data.minPrice),
        lte: Number(data.maxPrice),
      };
    }

    if (data.minPrice && !data.maxPrice) {
      filters.price = {
        gte: Number(data.minPrice),
      };
    }

    if (!data.minPrice && data.maxPrice) {
      filters.price = {
        lte: Number(data.maxPrice),
      };
    }

    if (data.propertyTypeIds && data.propertyTypeIds.length > 0) {
      filters.propertyTypeId = {
        in: data.propertyTypeIds,
      };
    }

    if (data.bhkTypeIds && data.bhkTypeIds.length > 0) {
      filters.bhkTypeId = {
        in: data.bhkTypeIds,
      };
    }

    if (data.furnishingTypeIds && data.furnishingTypeIds.length > 0) {
      filters.furnishingTypeId = {
        in: data.furnishingTypeIds,
      };
    }

    if (data.allotmentForIds && data.allotmentForIds.length > 0) {
      filters.allotmentForId = {
        in: data.allotmentForIds,
      };
    }

    if (data.ownerShipTypeIds && data.ownerShipTypeIds.length > 0) {
      filters.ownerShipTypeId = {
        in: data.ownerShipTypeIds,
      };
    }

    if (data.userIds && data.userIds.length > 0) {
      filters.userId = {
        in: data.userIds,
      };
    }

    if (data.area) {
      filters.area = {
        gte: Number(data.area),
      };
    }

    if (data.title) {
      filters.title = {
        contains: data.title,
      };
    }

    if (data.minAge && data.maxAge) {
      filters.age = {
        gte: Number(data.minAge),
        lte: Number(data.maxAge),
      };
    }

    if (data.minAge && !data.maxAge) {
      filters.age = {
        gte: Number(data.minAge),
      };
    }

    if (!data.minAge && data.maxAge) {
      filters.age = {
        lte: Number(data.maxAge),
      };
    }

    if (data.minMonthlyMaintenance && data.maxMonthlyMaintenance) {
      filters.monthlyMaintenance = {
        gte: Number(data.minMonthlyMaintenance),
        lte: Number(data.maxMonthlyMaintenance),
      };
    }

    if (data.minMonthlyMaintenance && !data.maxMonthlyMaintenance) {
      filters.monthlyMaintenance = {
        gte: Number(data.minMonthlyMaintenance),
      };
    }

    if (!data.minMonthlyMaintenance && data.maxMonthlyMaintenance) {
      filters.monthlyMaintenance = {
        lte: Number(data.maxMonthlyMaintenance),
      };
    }

    if (data.minsecurityDeposit && data.maxsecurityDeposit) {
      filters.securityDeposit = {
        gte: Number(data.minsecurityDeposit),
        lte: Number(data.maxsecurityDeposit),
      };
    }

    if (data.minsecurityDeposit && !data.maxsecurityDeposit) {
      filters.securityDeposit = {
        gte: Number(data.minsecurityDeposit),
      };
    }

    if (!data.minsecurityDeposit && data.maxsecurityDeposit) {
      filters.securityDeposit = {
        lte: Number(data.maxsecurityDeposit),
      };
    }

    if (data.minRent && data.maxRent) {
      filters.rent = {
        gte: Number(data.minRent),
        lte: Number(data.maxRent),
      };
    }

    if (data.minRent && !data.maxRent) {
      filters.rent = {
        gte: Number(data.minRent),
      };
    }

    if (!data.minRent && data.maxRent) {
      filters.rent = {
        lte: Number(data.maxRent),
      };
    }

    if (data.status) {
      filters.status = {
        equals: data.status,
      };
    }

    if (data.description) {
      filters.description = {
        contains: data.description,
      };
    }

    if (data.minCarpetArea && data.maxCarpetArea) {
      filters.carpetArea = {
        gte: Number(data.minCarpetArea),
        lte: Number(data.maxCarpetArea),
      };
    }

    if (data.minCarpetArea && !data.maxCarpetArea) {
      filters.carpetArea = {
        gte: Number(data.minCarpetArea),
      };
    }

    if (!data.minCarpetArea && data.maxCarpetArea) {
      filters.carpetArea = {
        lte: Number(data.maxCarpetArea),
      };
    }

    if (data.minFloorNumber && data.maxFloorNumber) {
      filters.floorNumber = {
        gte: Number(data.minFloorNumber),
        lte: Number(data.maxFloorNumber),
      };
    }

    if (data.minFloorNumber && !data.maxFloorNumber) {
      filters.floorNumber = {
        gte: Number(data.minFloorNumber),
      };
    }

    if (!data.minFloorNumber && data.maxFloorNumber) {
      filters.floorNumber = {
        lte: Number(data.maxFloorNumber),
      };
    }

    if (data.minTotalFloorsInBuilding && data.maxTotalFloorsInBuilding) {
      filters.totalFloorsInBuilding = {
        gte: Number(data.minTotalFloorsInBuilding),
        lte: Number(data.maxTotalFloorsInBuilding),
      };
    }

    if (data.minTotalFloorsInBuilding && !data.maxTotalFloorsInBuilding) {
      filters.totalFloorsInBuilding = {
        gte: Number(data.minTotalFloorsInBuilding),
      };
    }

    if (!data.minTotalFloorsInBuilding && data.maxTotalFloorsInBuilding) {
      filters.totalFloorsInBuilding = {
        lte: Number(data.maxTotalFloorsInBuilding),
      };
    }

    if (data.facingDirection) {
      filters.facingDirection = {
        equals: data.facingDirection,
      };
    }

    if (data.parkingSpace) {
      filters.parkingSpace = {
        equals: data.parkingSpace,
      };
    }

    const properties = await prisma.property.findMany({
      where: { ...filters },
    });

    let formatted = [];
    for (const property of properties) {
      const pp = await formatter.formattedProperty(property.id);
      formatted.push(pp);
    }

    response.status = 200;
    response.message = `Found ${formatted.length} properties.`;
    response.data = formatted;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
