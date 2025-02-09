import { NextResponse } from "next/server";

export function middleware(req) {
  const role = req.cookies.get("role")?.value; // Read role from cookies

  if (req.nextUrl.pathname.startsWith("/tasks/admin")) {
    // If user is not admin, redirect to login
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next(); // Allow access
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/tasks/admin"],
};
