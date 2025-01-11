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
      favouriteProperties: {
        include: {
          user: {
            include: {
              subscriptionRegister: {
                include: {
                  subscriptionDetails: true,
                },
              },
              bluetickDocuments: true,
            },
          },
        },
      },
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
      bluetickDocuments: {
        include: {
          image: true,
        },
      },
      favouriteProperties: {
        include: {
          property: {
            include: {
              propertyType: true,
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
          },
        },
      },
      interested: true,
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
    subscription = {
      id: item.id,
      name: item.name,
      price: item.price,
      type: item.accountType,
      isPopular: item.isPopular,
      properties: {},
    };

    for (const prop of item.subscriptionDetails) {
      let current = 0;
      if (prop.subscriptionRegister.length > 0) {
        current = Number(prop.subscriptionRegister[0].value);
      }
      subscription = {
        ...subscription,
        properties: {
          ...subscription.properties,
          [prop.label]: {
            id: prop.id,
            limit: Number(prop.value),
            current: Number(current),
          },
        },
      };
    }
  }

  user = { ...user, subscription: subscription };

  const interestedProperties: any = [];
  for (const item of user.interested) {
    const property = await formattedProperty(item.propertyId);
    interestedProperties.push(property);
  }

  user = { ...user, interested: interestedProperties };

  const rawProperties = await prisma.property.findMany({
    where: {
      userId: id,
    },
  });

  const properties: any = [];
  for (const item of rawProperties) {
    const property = await formattedProperty(item.id);
    properties.push(property);
  }

  return { ...user, properties: properties };
}

async function formatAmenityGroup(id: string, findBy: "amenity" | "group") {
  let returnObj = null;
  if (findBy === "amenity") {
    const amenity: any = await prisma.amenities.findUnique({
      where: {
        id: id,
      },
      include: {
        amenitiesGroup: true,
      },
    });

    returnObj = amenity;
  } else if (findBy === "group") {
    const group = await prisma.amenitiesGroup.findUnique({
      where: {
        id: id,
      },
      include: {
        amenities: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    returnObj = group;
  }

  if (!returnObj) {
    return null;
  }

  return returnObj;
}

export const formatter = {
  formatUser,
  formattedProperty,
};
