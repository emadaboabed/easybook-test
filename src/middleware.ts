import { NextResponse } from "next/server";
import { isAuthenticated } from "@/services/auth";

export function middleware(request) {
  const authToken = request.cookies.get("auth_token")?.value;

  //   if (!isAuthenticated() && !request.nextUrl.pathname.startsWith("/Login")) {
  //     return NextResponse.redirect(new URL("/Login", request.url));
  //   }
  if (!authToken && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*"],
};
