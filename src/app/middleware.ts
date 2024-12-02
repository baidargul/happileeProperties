import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log(req.nextUrl);
  const res = NextResponse.next();
  res.headers.append("Access-Control-Allow-Origin", "*");
  return res;
}

export const config = {
  matcher: "/api/:path*",
};
