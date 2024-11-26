import prisma from "../../commands/prisma";

async function addView(id: string) {
  const isExists = await prisma.property.findUnique({ where: { id: id } });

  if (!isExists) return;

  const result = await prisma.property.update({
    where: {
      id: id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

async function addInterested(propertyId: string, userId: string) {
  let isExists: any = await prisma.property.findUnique({
    where: { id: propertyId },
  });
  if (!isExists) return;

  isExists = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      buyer: true,
    },
  });

  if (!isExists) return;

  if (!isExists.buyer.id) return;

  isExists = await prisma.interested.findMany({
    where: {
      propertyId: propertyId,
      userId: userId,
    },
  });

  if (isExists) return;

  await prisma.interested.create({
    data: {
      propertyId: propertyId,
      userId: userId,
    },
  });
}

export const Views = {
  addView,
};
