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
  let user: any = await prisma.user.findUnique({
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

  // const subscription = await prisma.subscriptionRegister.findMany({
  //   where: {
  //     userId: id,
  //   },
  //   include: {
  //     subscriptionDetails: {
  //       include: {
  //         subscription: true,
  //       },
  //     },
  //   },
  // });

  // user = { ...user, subscription: subscription };

  const rawSubscription = await prisma.subscription.findMany({
    where: {
      accountType: user.type,
      subscriptionDetails: {},
    },
    include: {
      subscriptionDetails: {
        include: {
          subscriptionRegister: true,
        },
      },
    },
  });

  let subscription: any;
  for (const item of rawSubscription) {
    if (item.subscriptionDetails[0].subscriptionRegister.length > 0) {
      subscription = {
        id: item.id,
        name: item.name,
        type: item.accountType,
      };

      for (const prop of item.subscriptionDetails) {
        subscription = {
          ...subscription,
          properties: {
            ...subscription.properties,
            [prop.label]: {
              id: prop.id,
              limit: Number(prop.value),
              current: Number(prop.subscriptionRegister[0].value),
            },
          },
        };
      }
    }
  }

  user = { ...user, subscription: subscription };

  const interestedProperties: any = [];
  for (const item of user.interested) {
    const property = await formattedProperty(item.propertyId);
    interestedProperties.push(property);
  }

  user = { ...user, interested: interestedProperties };

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
