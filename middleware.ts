import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  // Paths that require authentication
  const protectedPaths = ['/dsa-dashboard', '/referral', '/track', '/earnings', '/applications', '/notifications', '/profile'];

  // Check if trying to access login pages
  if (request.nextUrl.pathname === '/dsa-auth' || request.nextUrl.pathname === '/splash') {
    // If token exists and is valid, redirect to dashboard
    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || 'your-secret-key'
        );
        await jose.jwtVerify(token.value, secret);
        // Token is valid, redirect to dashboard
        return NextResponse.redirect(new URL('/dsa-dashboard', request.url));
      } catch (error) {
        // Token is invalid, let them access login page
        return NextResponse.next();
      }
    }
    // No token, let them access login page
    return NextResponse.next();
  }

  // Check if path requires authentication
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/dsa-auth', request.url));
    }

    try {
      // Convert secret to Uint8Array for jose
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-secret-key'
      );

      // Verify token using jose
      await jose.jwtVerify(token.value, secret);
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL('/dsa-auth', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dsa-dashboard/:path*',
    '/referral/:path*',
    '/track/:path*',
    '/earnings/:path*',
    '/applications/:path*',
    '/notifications/:path*',
    '/profile/:path*',
    '/dsa-auth',
    '/splash'  // Add splash page to matcher
  ]
}; 