import prisma from "../../commands/prisma";
import { SERVER_ACTIONS } from "../SERVER_ACTIONS";

async function formattedProperty(id: string) {
  const property = await prisma.property.findUnique({
    where: {
      id: id,
    },
    include: {
      propertyType: {
        include: {
          allotmentType: true,
        },
      },
      bhkType: true,
      furnishing: true,
      ownershipType: true,
      allotmentFor: true,
      interested: {
        include: {
          user: true,
        },
      },
      propertyImages: {
        include: {
          image: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!property) {
    return null;
  }

  // const lstInterest = await prisma.interested.findMany({
  //   where: {
  //     propertyId: id,
  //   },
  //   include: {
  //     user: true,
  //   },
  // });

  // let interestedUsers = [];
  // for (const item of lstInterest) {
  //   const res = await SERVER_ACTIONS.formatter.formatUser(item.id);
  //   interestedUsers.push(res);
  // }

  // const interested = interestedUsers;

  const amenities = await prisma.amenitiesregister.findMany({
    where: {
      propertyId: id,
    },
    include: {
      amenities: true,
    },
  });

  const allotmentFor = await prisma.allotmentFor.findUnique({
    where: {
      id: property.allotmentForId,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: property.userId || "",
    },
  });
  const final = {
    ...property,
    amenities: [...amenities],
    allotmentFor: allotmentFor,
    user: user,
    // interested: [...interested],
  };

  return final;
}

async function formatUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      builder: true,
      image: true,
      agent: true,
      buyer: true,
      favouriteProperties: true,
      interested: true,
    },
    omit: {
      password: true,
    },
  });

  const properties = await prisma.property.findMany({
    where: {
      userId: id,
    },
  });

  return { ...user, properties: properties };
}

export const formatter = {
  formatUser,
  formattedProperty,
};
