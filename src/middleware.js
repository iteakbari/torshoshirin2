import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.url;
  let pathname = req.nextUrl.pathname;
  const token = req.cookies.get("token");

  // اینجا عبارت منظم را اضافه می‌کنیم تا هر بخشی مانند //pipe/UUID/ را حذف کند
  pathname = pathname.replace(/\/\/pipe\/[a-z0-9-]+\//i, "/");

  // console.log("Cleaned pathname: ", pathname);

  if (!token || token === undefined) {
    // console.log("Token does not exist", pathname);
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/purchase")) {
      // console.log("Redirecting to sign-in page");
      return NextResponse.redirect(new URL("/sign", url));
    }
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/purchase", "/sign"],
};
