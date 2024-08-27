import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import withAuth from '@/middlewares/withAuth';

export async function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  '/',
  '/user',
  '/master/jurnal/penyesuaian',
  '/master/jurnal/umum',
  '/master/jurnal/koreksi',
  '/master/jurnal/penutup',
  '/mapping/expenditure-050/to-sap-13',
]);
