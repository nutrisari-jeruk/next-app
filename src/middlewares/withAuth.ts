import { getToken } from 'next-auth/jwt';
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

const onlyAdmin: string[] = [
  '/master/jurnal/penyesuaian',
  '/master/jurnal/umum',
  '/master/jurnal/koreksi',
  '/master/jurnal/penutup',
  '/mapping/expenditure-050/to-sap-13',
  '/user',
];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
      } as any);

      if (!token) {
        const url = new URL('/login', req.url);
        url.searchParams.set('callBackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (onlyAdmin.includes(pathname) && token.role !== 'admin') {
        return NextResponse.redirect(new URL('/404', req.url));
      }
    }
    return middleware(req, next);
  };
}
