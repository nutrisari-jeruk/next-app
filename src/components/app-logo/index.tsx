import { RectangleGroupIcon } from '@heroicons/react/24/outline';

export default function AppLogo() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <div className="flex items-center justify-center gap-2 text-white">
      <RectangleGroupIcon className="h-12 w-12" />
      <span className="font-bold">{appName}</span>
    </div>
  );
}
