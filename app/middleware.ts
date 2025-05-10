import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simple middleware to redirect unauthenticated users to the login page
// In a real application, you would check for a valid session/token
export function middleware(request: NextRequest) {
  // For demo purposes, we'll consider paths that should be accessible without authentication
  const publicPaths = ["/login", "/signup", "/forgot-password"]

  // Check if the requested path is a public path
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`),
  )

  // For demo purposes, we'll use a dummy check for authentication
  // In a real app, you would verify a token or session
  const isAuthenticated = request.cookies.has("auth_token")

  // If the path is not public and the user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
