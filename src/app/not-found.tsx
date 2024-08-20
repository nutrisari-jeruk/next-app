import Link from 'next/link';
import { TwButton } from '@/components';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-800">
      <div className="text-center">
        <img
          src="/404.svg"
          alt="404 Error"
          className="mx-auto mb-4"
          style={{ width: '300px', height: 'auto' }}
        />
        <h2 className="mb-2 text-2xl font-medium">Halaman Tidak Ditemukan</h2>
        <p className="mb-8 text-lg text-gray-500">
          Halaman yang Anda cari tidak tersedia, silahkan kembali.
        </p>
        <Link href="/">
          <TwButton
            title="Kembali ke Dashboard"
            className="mx-auto rounded bg-indigo-600 px-4 py-2 text-lg font-medium text-white shadow-md transition-all duration-300 hover:bg-indigo-700"
          />
        </Link>
      </div>
    </div>
  );
}
