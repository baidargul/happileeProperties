import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // Add CORS headers for API requests
  if (req.nextUrl.pathname.startsWith("/api")) {
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  return res;
}

export const config = {
  matcher: "/api/:path*",
};
