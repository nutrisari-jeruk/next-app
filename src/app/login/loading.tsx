import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-96 w-96 animate-spin rounded-full border-b-4 border-t-4 border-indigo-600"></div>
        <div className="flex flex-col items-center justify-center">
          <Image
            width={300}
            height={300}
            alt="loading-image"
            src="/loading-image.svg"
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold text-indigo-600">Please wait...</h1>
        </div>
      </div>
    </div>
  );
}
