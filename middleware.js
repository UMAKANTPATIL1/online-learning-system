import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  console.log("Middleware token:", token);

  const isPublicPath =
    pathname === "/" ||
    pathname === "/register" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon");

  if (isPublicPath || token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/?showLogin=true", request.url));
}

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};
