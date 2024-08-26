import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/mapping')) {
    return NextResponse.redirect(new URL('/404', request.url));
  }
}

export const config = {
  matcher: ['/((?!login|role-select).*)'],
};
