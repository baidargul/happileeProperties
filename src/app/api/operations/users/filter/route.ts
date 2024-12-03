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
<<<<<<< HEAD
  const deleted = req.nextUrl.searchParams.get("deleted")||null;
=======
  const deleted = req.nextUrl.searchParams.get("deleted");
  const del = deleted === "true" ? true : false;
>>>>>>> c4e64b559d8e01b4d31f4036c5a20ee2de8184b3

  try {
    const filters: any = {};

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
    if (deleted!=null) {
      // console.log(deleted)
      // console.log(Boolean(deleted))
      filters.deleted = JSON.parse(deleted);
    }
    // console.log(filters)
    const users = await prisma.user.findMany({
      where: filters,
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
