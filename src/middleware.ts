import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
  
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      return NextResponse.next();
    }
  
    const token = req.cookies.get("userData")?.value;
    const cookieConsent = req.cookies.get("cookieConsent")?.value;

    
    if (!token || !cookieConsent) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  
    return NextResponse.next();
  }
  
  export const config = {
    matcher: ["/((?!login|register|_next/static|_next/image|favicon.ico).*)"],
  };
  