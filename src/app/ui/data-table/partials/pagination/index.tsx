'use client';

import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import type { Meta } from '@/types/pagination';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const MAX_VISIBLE_PAGES = 7;
export default function Pagination({ meta }: { meta: Meta }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages less than MAX_VISIBLE_PAGES,
    // display all pages without any ellipsis.
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
      return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const displayedLinks = generatePagination(meta.current_page, meta.last_page);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={`${createPageURL(1)}`}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
          )}
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </Link>
        <Link
          href={`${createPageURL(meta.current_page - 1)}`}
          aria-disabled={meta.current_page === 1}
          onClick={(e) => meta.current_page === 1 && e.preventDefault()}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
          )}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
        <Link
          href={`${createPageURL(meta.current_page + 1)}`}
          aria-disabled={meta.current_page === meta.last_page}
          onClick={(e) =>
            meta.current_page === meta.last_page && e.preventDefault()
          }
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
          )}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
        <Link
          href={`${createPageURL(meta.last_page)}`}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
          )}
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </Link>
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
            <Link
              href={`${createPageURL(1)}`}
              className={clsx(
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              )}
            >
              <ChevronDoubleLeftIcon className="h-4 w-4" />
            </Link>
            <Link
              href={`${createPageURL(meta.current_page - 1)}`}
              aria-disabled={meta.current_page === 1}
              onClick={(e) => meta.current_page === 1 && e.preventDefault()}
              className={clsx(
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              )}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Link>
            {displayedLinks.map((item, index) => (
              <Link
                key={index}
                href={`${createPageURL(item)}`}
                aria-disabled={item === '...'}
                onClick={(e) => item === '...' && e.preventDefault()}
                className={clsx(
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
                  item === meta.current_page &&
                    'bg-indigo-600 text-white hover:text-gray-900',
                  item === '...' && 'cursor-default',
                )}
              >
                {item}
              </Link>
            ))}
            <Link
              href={`${createPageURL(meta.current_page + 1)}`}
              aria-disabled={meta.current_page === meta.last_page}
              onClick={(e) =>
                meta.current_page === meta.last_page && e.preventDefault()
              }
              className={clsx(
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              )}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={`${createPageURL(meta.last_page)}`}
              className={clsx(
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              )}
            >
              <ChevronDoubleRightIcon className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
