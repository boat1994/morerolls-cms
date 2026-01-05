import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if we are in production mode according to the environment variable
  const isMaintenanceMode = process.env.MODE === 'production'

  // If not in maintenance mode, continue as normal
  if (!isMaintenanceMode) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  // List of paths that should NOT be redirected
  const allowedPaths = [
    '/under-construction',
    '/favicon.ico',
    '/logo.avif', // Ensure logo is accessible
    '/file.svg',
    '/globe.svg',
  ]

  // Allow access to:
  // 1. /under-construction page
  // 2. Static files (images, etc.) in public or _next/static
  // 3. API routes (optional, but usually good to keep open or block depending on needs. Blocking for now as per "every page" request)
  // 4. Admin panel? User said "every page", so we block admin too unless requested otherwise.
  
  if (
    pathname.startsWith('/_next') || // Next.js internal resources
    pathname.startsWith('/static') || // Static files
    allowedPaths.includes(pathname) ||
    // Check if it's an image in public (common extensions)
    /\.(jpg|jpeg|png|gif|svg|avif|webp|ico|css|js)$/i.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Redirect to under construction page
  return NextResponse.redirect(new URL('/under-construction', request.url))
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) -> actually, let's include API in the check if we want to block EVERYTHING.
     * But usually middleware matchers exclude static files for performance.
     * Let's match everything and filter in the function.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
