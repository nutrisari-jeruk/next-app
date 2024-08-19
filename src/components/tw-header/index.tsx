import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  title?: string;
  className?: string;
}

export default function TwHeader({ title, className }: Props) {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <Link
          href="/"
          className={clsx(
            'text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight',
            className,
          )}
        >
          {title}
        </Link>
      </div>
    </div>
  );
}
