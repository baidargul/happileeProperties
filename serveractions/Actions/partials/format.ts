import prisma from "../../commands/prisma";

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

  const final = {
    ...property,
    amenities: [...amenities],
    allotmentFor: allotmentFor,
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

  return user;
}

export const formatter = {
  formatUser,
  formattedProperty,
};
