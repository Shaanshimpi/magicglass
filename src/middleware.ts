import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Safely decodes a JWT payload in the Edge/Next.js Runtime without external dependencies.
 */
function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const decodedStr = atob(base64)
    const jsonPayload = decodeURIComponent(
      decodedStr
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    const parsed = JSON.parse(jsonPayload)

    // Check expiration if present
    if (parsed.exp && typeof parsed.exp === 'number') {
      if (parsed.exp * 1000 < Date.now()) {
        return null // Token expired
      }
    }

    return parsed
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const token = request.cookies.get('payload-token')?.value
  const user = token ? decodeJwtPayload(token) : null

  // ---------------------------------------------------------------------------
  // 1. Protect /dashboard routes (Auth-blocked for unauthenticated users)
  // ---------------------------------------------------------------------------
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    // Authenticated users (admin or manager) can access /dashboard
    return NextResponse.next()
  }

  // ---------------------------------------------------------------------------
  // 2. Protect /admin routes (Strictly Admin only; Managers redirected to /dashboard)
  // ---------------------------------------------------------------------------
  if (pathname.startsWith('/admin')) {
    // If not logged in, redirect to /login?redirect=/admin
    if (!user) {
      // Allow internal payload static assets if any match
      if (pathname.includes('/_next/') || pathname.includes('/api/')) {
        return NextResponse.next()
      }
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // If logged in but role is NOT admin (e.g. manager), redirect to /dashboard
    if (user.role !== 'admin') {
      const dashboardUrl = new URL('/dashboard', request.url)
      return NextResponse.redirect(dashboardUrl)
    }

    // If user is admin, allow access to /admin
    return NextResponse.next()
  }

  // ---------------------------------------------------------------------------
  // 3. Handle /login and /staff-login for already logged-in users
  // ---------------------------------------------------------------------------
  if (pathname === '/login' || pathname === '/staff-login') {
    const redirectParam = searchParams.get('redirect')

    // If user is already authenticated, automatically redirect them to their destination
    if (user) {
      if (redirectParam && redirectParam.startsWith('/admin') && user.role === 'admin') {
        return NextResponse.redirect(new URL(redirectParam, request.url))
      }
      return NextResponse.redirect(new URL(redirectParam || '/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/staff-login'],
}
