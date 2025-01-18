import { FILTER_TYPE } from "../../commands/partials/property";
import prisma from "../../commands/prisma";
import { formatter } from "./format";

async function filter(data: FILTER_TYPE) {
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

  if (data.amenitiesIds && data.amenitiesIds.length > 0) {
    filters.amenitiesregister = {
      some: {
        amentitiesId: {
          in: data.amenitiesIds,
        },
      },
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

  if (data.title || data.description) {
    filters.OR = [];

    if (data.title) {
      filters.OR.push({
        title: {
          contains: data.title,
        },
      });
    }

    if (data.description) {
      filters.OR.push({
        description: {
          contains: data.description,
        },
      });
    }
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

  console.log(filters);

  const properties = await prisma.property.findMany({
    where: { ...filters },
    include: {
      amenitiesregister: true,
      allotmentFor: true,
      bhkType: true,
      favouriteProperties: true,
      furnishing: true,
      interested: true,
      ownershipType: true,
      propertyAmenities: true,
      propertyImages: true,
      propertyType: true,
      user: true,
      leads: true,
    },
  });

  let formatted = [];
  for (const property of properties) {
    const pp = await formatter.formattedProperty(property.id);
    formatted.push(pp);
  }

  return formatted;
}

export const properties = {
  filter,
};
