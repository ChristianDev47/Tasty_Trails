import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.has('sesion')
  
  const protectedRoutes = [
    "/account",
    "/account/profile",
    "/account/profile/edit",
    "/account/orders",
    "/account/orders/detalle",
    "/account/orders/detalle/:path*",
    "/account/direction",
    "/account/direction/form",
    "/account/change_password",
    "/checkout",
  ];
  
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
);

try {
  if (isProtectedRoute && !authToken) { 
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  if (request.nextUrl.pathname === "/account" && authToken) {
    return NextResponse.redirect(new URL("/account/profile", request.url));
  }
  
} catch (error) {
    console.error("Error en la verificación del token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/account",
    "/checkout",
    "/account/profile",
    "/account/profile/edit",
    "/account/orders",
    "/account/orders/detalle",
    "/account/orders/detalle/:path*",
    "/account/direction",
    "/account/direction/form",
    "/account/change_password",
  ],
};
