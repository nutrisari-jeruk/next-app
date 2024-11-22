import { RectangleGroupIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

export default function AppLogo() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  const { data } = useSession();

  const fiscalYear = data?.user?.fiscal_year;

  return (
    <div className="flex items-center justify-center gap-2 text-white">
      <RectangleGroupIcon className="h-12 w-12" />
      <span className="font-bold">
        {appName} - {fiscalYear}
      </span>
    </div>
  );
}
