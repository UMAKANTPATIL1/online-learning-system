// import Cookies from "js-cookie";
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // const token =
//   //   request.cookies.get("token")?.value ||
//   //   request.headers.get("authorization")?.split("Bearer ")[1] ||
//   //   null;

//   // const token = Cookies.get("token");
//   const { pathname } = request.nextUrl;

//   console.log("path name:", pathname);
//   // Allow access to root and static/public files (like favicon, images, etc.)
//   const isPublicPath =
//     pathname === "/" ||
//     pathname === "/register" ||
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/images") ||
//     pathname.startsWith("/favicon.ico") ||
//     pathname.startsWith("/login");

//   // Allow if public or if token exists
//   console.log("isPublicPath:", isPublicPath, "Token:", token);
//   if (isPublicPath || token) {
//     return NextResponse.next();
//   }

//   //  If not logged in and trying to access any private route
//   return NextResponse.redirect(new URL("/?showLogin=true", request.url));
// }

// export const config = {
//   matcher: ["/((?!api|_next|static|.*\\..*).*)"], // matches everything except static files
// };
