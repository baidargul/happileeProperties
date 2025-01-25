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
      builder: {
        include: {
          assignedTo: {
            include: {
              builder: {
                include: {
                  user: true,
                },
              },
              agent: {
                include: {
                  user: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
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
      builder: {
        include: {
          assignedTo: {
            include: {
              builder: {
                include: {
                  user: true,
                },
              },
              agent: {
                include: {
                  user: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
      image: true,
      agent: {
        include: {
          assignedTo: {
            include: {
              builder: true,
              agent: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
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
      subscriptionDetails: {
        some: {
          subscriptionRegister: {
            some: {
              userId: id,
            },
          },
        },
      },
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
  let isExpired: boolean = false;
  for (const item of rawSubscription) {
    subscription = {
      id: item.id,
      name: item.name,
      price: item.price,
      type: item.accountType,
      isPopular: item.isPopular,
      properties: {},
      isExpired: isExpired,
    };

    for (const prop of item.subscriptionDetails) {
      let current = 0;
      if (prop.subscriptionRegister.length > 0) {
        current = Number(prop.subscriptionRegister[0].value);
        //get days count and if days are equal or above 60 then expired = true
        const newDate = new Date();
        const oldDate = new Date(
          String(prop.subscriptionRegister[0].createdAt)
        );
        const diff = newDate.getTime() - oldDate.getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24));
        if (days >= 60) {
          isExpired = true;
        }
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

  const preferences = await formatUserPreferences(id);

  return { ...user, properties: properties, preferences: preferences };
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

async function formatUserPreferences(id: string) {
  let isExists = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExists) return null;

  const rawPreferences = await prisma.userPreferences.findFirst({
    where: {
      userId: id,
    },
  });

  if (!rawPreferences) return null;

  const amenityPreference = await prisma.amenitiesPreferences.findMany({
    where: {
      userId: id,
    },
    include: {
      amenities: {
        include: {
          amenitiesGroup: true,
        },
      },
    },
  });

  const propertyPreference = await prisma.propertyTypePreferences.findMany({
    where: {
      userId: id,
    },
    include: {
      propertyType: {
        include: {
          allotmentType: true,
        },
      },
    },
  });

  let preferences = {
    location: rawPreferences.location,
    minBudget: rawPreferences.minBudget,
    maxBudget: rawPreferences.maxBudget,
    amenityPreference: amenityPreference,
    propertyTypePreference: propertyPreference,
  };

  return preferences;
}

export const formatter = {
  formatUser,
  formattedProperty,
};
