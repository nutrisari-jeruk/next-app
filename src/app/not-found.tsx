import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-lg text-gray-500 mb-8">
          Halaman yang Anda cari tidak tersedia, silahkan kembali.
        </p>
        <Link
          href="/"
          className="bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-lg py-2 px-4 rounded shadow-md transition-all duration-300"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
