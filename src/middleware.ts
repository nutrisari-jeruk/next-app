import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import authConfig from '@/auth.config';
import { apiAuthPrefix, authRoutes, adminRoutes } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  } as any);

  const isLoggedIn = !!token;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAllowedRoute = adminRoutes.some((route) => {
    return nextUrl.pathname.startsWith(route);
  });

  const originalSSOToken = nextUrl.searchParams.get('token') || '';
  const MaskedSSOToken = originalSSOToken.split('_')[0];

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(req.url, nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    const url = new URL('/login', req.url);
    url.searchParams.set('callbackUrl', encodeURI(req.url));
    originalSSOToken && url.searchParams.set('ssoToken', MaskedSSOToken);
    return Response.redirect(url);
  }

  if (token.role !== 'admin' && isAllowedRoute) {
    return Response.redirect(new URL('/404', req.url));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
