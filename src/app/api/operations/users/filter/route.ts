import { NextRequest } from "next/server";
import prisma from "../../../../../../serveractions/commands/prisma";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  const name = req.nextUrl.searchParams.get("name");
  const email = req.nextUrl.searchParams.get("email");
  const phone = req.nextUrl.searchParams.get("phone");
  const type = req.nextUrl.searchParams.get("type");
  const status = req.nextUrl.searchParams.get("status");
  const deleted = req.nextUrl.searchParams.get("deleted") || null;
  const sortBy = req.nextUrl.searchParams.get("sortBy") || null;
  try {
    const filters: any = {};
    filters.orderBy = {
      createdAt: "desc",
    };

    if (name) {
      filters.name = {
        contains: String(name),
        mode: "insensitive",
      };
    }
    if (email) {
      filters.email = {
        contains: String(email),
        mode: "insensitive",
      };
    }
    if (phone) {
      filters.phone = {
        contains: String(phone),
      };
    }
    if (type) {
      filters.type = String(type).toLocaleUpperCase();
    }
    if (status) {
      filters.status = String(status).toLocaleUpperCase();
    }
    if (deleted != null) {
      filters.deleted = JSON.parse(deleted);
    }

    if (sortBy) {
      const sortOrder = sortBy.startsWith("-") ? "desc" : "asc";
      const sortField = sortBy.replace("-", "");
      filters.orderBy = {
        [sortField]: sortOrder,
      };
    }

    const users = await prisma.user.findMany({
      where: filters,
      orderBy: filters.orderBy,
    });

    response.status = 200;
    response.message = "Success";
    response.data = users;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
