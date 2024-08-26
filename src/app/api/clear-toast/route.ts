import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const session = cookies();
  session.delete('toastMessage');
  session.delete('toastStatus');

  return NextResponse.json({ success: true });
}
