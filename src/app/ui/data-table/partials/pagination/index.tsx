'use client';

import clsx from 'clsx';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import type { Links, Meta } from '@/types/pagination';

const MAX_VISIBLE_PAGES = 7;
export default function Pagination({
  links,
  meta,
}: {
  links: Links[];
  meta: Meta;
}) {
  const getDisplayedLinks = () => {
    const totalLinks = links.length;
    const currentPage = links.findIndex((link) => link.active) + 1;
    const maxVisiblePages = MAX_VISIBLE_PAGES;
    const halfRange = Math.floor(maxVisiblePages / 2);

    if (totalLinks <= maxVisiblePages) {
      return links;
    }

    let start = Math.max(1, currentPage - halfRange);
    let end = Math.min(totalLinks, currentPage + halfRange);

    if (currentPage <= halfRange) {
      end = maxVisiblePages;
    } else if (currentPage + halfRange >= totalLinks) {
      start = totalLinks - maxVisiblePages + 1;
    }

    const displayedLinks = [];

    if (start > 1) {
      displayedLinks.push(links[0], { label: '...', active: false });
    }

    displayedLinks.push(...links.slice(start - 1, end));

    if (end < totalLinks) {
      displayedLinks.push(
        { label: '...', active: false },
        links[totalLinks - 1],
      );
    }

    return displayedLinks;
  };

  const displayedLinks = getDisplayedLinks();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleClick = (page: string) => {
    if (page === '...') return;
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          onClick={() => handleClick((meta.current_page - 1).toString())}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Button>
        <Button
          onClick={() => handleClick((meta.current_page + 1).toString())} 
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Button>
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
            {displayedLinks.map(({ label, active }) => (
              <Button
                key={label}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
                  active && 'bg-indigo-600 text-white hover:text-gray-900',
                  label === '...' && 'cursor-default',
                )}
                disabled={label === '...'}
                onClick={() => handleClick(label)}
                type="button"
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
