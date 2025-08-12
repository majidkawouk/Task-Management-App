import { NextResponse } from "next/server";

export function middleware(req) {
  const role = req.cookies.get("role")?.value;
  if (req.nextUrl.pathname.startsWith("/tasks/admin")) {
   
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next(); 
}


export const config = {
  matcher: ["/tasks/admin"],
};
