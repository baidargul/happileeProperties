import { NextRequest } from "next/server";
import prisma from "../../../../../serveractions/commands/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    let structure: any = await prisma.allotmentType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    let allotmentFor: any = await prisma.allotmentFor.findMany({
      orderBy: {
        name: "asc",
      },
    });

    let propertyType: any = await prisma.propertyType.findMany({
      include: {
        allotmentType: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const amenities = await prisma.amenities.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const bhks = await prisma.bhk.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const furnishing = await prisma.furnishing.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const ownership = await prisma.ownershipType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const final = {
      allotmentType: structure,
      lookingFor: {
        allotmentFor,
        propertyType,
      },
      bhk: [...bhks],
      furnishing: [...furnishing],
      ownership: [...ownership],
      amenities: [...amenities],
    };

    response.status = 200;
    response.message = "Success";
    response.data = final;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data: any = await req.json();

    if (!data) {
      response.status = 400;
      response.message = "Invalid request";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (data.allotmentTypes.length === 0) {
      response.status = 400;
      response.message = "Allotment types are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (data.types.length === 0) {
      response.status = 400;
      response.message = "Property types are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (data.allotmentFor.length === 0) {
      response.status = 400;
      response.message = "Allotment for are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (data.bhkTypes.length === 0) {
      response.status = 400;
      response.message = "BHK types are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (data.finishingTypes.length === 0) {
      response.status = 400;
      response.message = "Finishing types are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (data.amenities.length === 0) {
      response.status = 400;
      response.message = "Amenities are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (data.ownership.length === 0) {
      response.status = 400;
      response.message = "Ownership is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    for (const item of data.allotmentTypes) {
      const isExists = await prisma.allotmentType.findFirst({
        where: {
          name: String(item).toLocaleLowerCase(),
        },
      });

      if (!isExists) {
        await prisma.allotmentType.create({
          data: {
            name: String(item).toLocaleLowerCase(),
          },
        });
      }
    }

    for (const item of data.types) {
      const allotmentType = await prisma.allotmentType.findFirst({
        where: {
          name: String(item.type).toLocaleLowerCase(),
        },
      });

      if (!allotmentType) {
        console.log(
          `Allotment type: '${item.type}' not found for type: '${item.name}'`
        );
      } else {
        await prisma.propertyType.create({
          data: {
            name: String(item.name).toLocaleLowerCase(),
            allotmentType: {
              connect: {
                id: allotmentType.id,
              },
            },
          },
        });
      }
    }

    for (const item of data.allotmentFor) {
      const isExists = await prisma.allotmentFor.findUnique({
        where: {
          name: String(item).toLocaleLowerCase(),
        },
      });

      if (!isExists) {
        await prisma.allotmentFor.create({
          data: {
            name: String(item).toLocaleLowerCase(),
          },
        });
      }
    }

    for (const item of data.bhkTypes) {
      const isExists = await prisma.bhk.findUnique({
        where: {
          name: String(item).toLocaleLowerCase(),
        },
      });

      if (!isExists) {
        await prisma.bhk.create({
          data: {
            name: String(item).toLocaleLowerCase(),
          },
        });
      }
    }

    for (const item of data.finishingTypes) {
      const isExists = await prisma.furnishing.findUnique({
        where: {
          name: String(item).toLocaleLowerCase(),
        },
      });

      if (!isExists) {
        await prisma.furnishing.create({
          data: {
            name: String(item).toLocaleLowerCase(),
          },
        });
      }
    }

    for (const item of data.amenities) {
      const isExists = await prisma.amenities.findUnique({
        where: {
          name: String(item).toLocaleLowerCase(),
        },
      });

      if (!isExists) {
        await prisma.amenities.create({
          data: {
            name: String(item).toLocaleLowerCase(),
          },
        });
      }
    }

    for (const item of data.ownership) {
      const isExists = await prisma.ownershipType.findUnique({
        where: {
          name: String(item).toLocaleLowerCase(),
        },
      });

      if (!isExists) {
        await prisma.ownershipType.create({
          data: {
            name: String(item).toLocaleLowerCase(),
          },
        });
      }
    }

    response.status = 200;
    response.message = "Property structure initialized successfully.";
    response.data = null;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
