// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // Read token from cookie
//   const token = request.cookies.get("token")?.value;

//   // Or from Authorization header
//   const authHeader = request.headers.get("authorization");
//   const headerToken = authHeader?.startsWith("Bearer ")
//     ? authHeader.split(" ")[1]
//     : null;

//   const finalToken = token || headerToken;

//   const { pathname } = request.nextUrl;

//   console.log("Middleware Token:", finalToken);

//   const isPublicPath =
//     pathname === "/" ||
//     pathname === "/register" ||
//     pathname.startsWith("/login") ||
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/images") ||
//     pathname.startsWith("/favicon");

//   if (isPublicPath || finalToken) {
//     return NextResponse.next();
//   }

//   return NextResponse.redirect(new URL("/?showLogin=true", request.url));
// }

// export const config = {
//   matcher: ["/((?!api|_next|static|.*\\..*).*)"],
// };
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Middleware({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Protected User:", user);
    if (!user?.token) {
      router.push("/?showLogin=true");
    }
  }, []);

  return children;
}
