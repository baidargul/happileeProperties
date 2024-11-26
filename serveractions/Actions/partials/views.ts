import prisma from "../../commands/prisma";

async function addView(id: string) {
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

export const Views = {
  addView,
};
