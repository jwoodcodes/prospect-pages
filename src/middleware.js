import { NextResponse } from "next/server";

// Add paths that should be protected
const protectedPaths = [
  "/protected",
  "/dashboard",
  // Add other protected routes here
];

// Add paths that should be completely public
const publicPaths = [
  "/auth-test",
  "/api/auth/callback",
  "/", // Add root path as public
];

export function middleware(request) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname;

  // Always allow public paths
  if (publicPaths.some((prefix) => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Only check auth for protected paths
  if (!protectedPaths.some((prefix) => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const token = request.cookies.get("wixToken");

  // If there is no token and the path is protected, redirect to login
  if (!token) {
    const siteId = process.env.NEXT_PUBLIC_WIX_SITE_ID;
    const wixAuthUrl = `https://www.wix.com/oauth/authorize?client_id=${siteId}&response_type=code`;
    return NextResponse.redirect(wixAuthUrl);
  }

  return NextResponse.next();
}

// Specify which routes to protect
export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
