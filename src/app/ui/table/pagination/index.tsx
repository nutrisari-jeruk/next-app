import clsx from 'clsx';
import { Button } from '@headlessui/react';
import type { Links, Meta } from '@/types/pagination';

export default function Pagination({
  links,
  meta,
}: {
  links: Links[];
  meta: Meta;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to{' '}
            <span className="font-medium">{meta.to}</span> of{' '}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md bg-white shadow-sm"
          >
            {links.length > 3 &&
              links.map(({ label, active }) => (
                <Button
                  key={label}
                  aria-current="page"
                  className={clsx(
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                    active && 'bg-indigo-600 text-white',
                  )}
                >
                  {label}
                </Button>
              ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
