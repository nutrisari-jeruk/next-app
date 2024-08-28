'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center rounded-lg bg-white">
      <h2 className="text-center">Something went wrong!</h2>
      <Link
        href="/mapping/expenditure-050/to-sap-13"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go back to list
      </Link>
    </main>
  );
}
