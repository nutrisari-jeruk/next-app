'use client';

export default function Error() {
  return (
    // TODO: improve error message
    <div className="flex h-full w-full flex-col items-center justify-center bg-white">
      <span>Oopss.. Something went wrong. </span>
      <span>Please try again later.</span>
    </div>
  );
}
