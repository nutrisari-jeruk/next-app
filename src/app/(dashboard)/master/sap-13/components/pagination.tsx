'use client';

import clsx from 'clsx';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import type { List } from '@/types/sap13/sap13';
import { Button } from '@headlessui/react';
import { Row } from '@/types/table';

export default function Pagination({ 
  data,
  itemsPerPage,
  currentPage,
  lastPage,
  setCurrentPage,
}: { 
  data: Row[];
  itemsPerPage: number;
  currentPage: number;
  lastPage: number;
  setCurrentPage: any;
}) {
  const page = Math.ceil(data.length / itemsPerPage);
  const pageButtons = [];
  const total = data.length;
  let to = 0;
  let from = 0;
  if(data.length > 0){
    from = ((currentPage - 1) * itemsPerPage) + 1;
    if(currentPage == lastPage){
      to = total - ((page - currentPage) * itemsPerPage);
    }else{
      to =  currentPage * itemsPerPage;
    }
  }

  const visible_page = 10;

  if (page <= visible_page) {
    for (let i = 1; i <= page; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
            
            i === currentPage &&
              'bg-indigo-600 text-white hover:text-gray-900'
          )}
        >
          {i}
        </Button>
      );
    }
  }else{
    if (currentPage < 5) {
      for (let i = 1; i <= 5; i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={clsx(
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              
              i === currentPage &&
                'bg-indigo-600 text-white hover:text-gray-900'
            )}
          >
            {i}
          </Button>
        );
      }
      pageButtons.push(
        <Button
          key={0}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
          )}
        >
          ...
        </Button>
      );
      pageButtons.push(
        <Button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
            
            page === currentPage &&
              'bg-indigo-600 text-white hover:text-gray-900'
          )}
        >
          {page}
        </Button>
      );
    }else if(currentPage == page){
      pageButtons.push(
        <Button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
            
            1 === currentPage &&
              'bg-indigo-600 text-white hover:text-gray-900'
          )}
        >
          {1}
        </Button>
      );
      pageButtons.push(
        <Button
          key={0}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
          )}
        >
          ...
        </Button>
      );
      for (let i = (page - 5); i <= (page - 1); i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={clsx(
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              
              i === currentPage &&
                'bg-indigo-600 text-white hover:text-gray-900'
            )}
          >
            {i}
          </Button>
        );
      }
      pageButtons.push(
        <Button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
            
            page === currentPage &&
              'bg-indigo-600 text-white hover:text-gray-900'
          )}
        >
          {page}
        </Button>
      );
    
    }else if(currentPage > (page - 5)){
      pageButtons.push(
        <Button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
            
            1 === currentPage &&
              'bg-indigo-600 text-white hover:text-gray-900'
          )}
        >
          {1}
        </Button>
      );
      pageButtons.push(
        <Button
          key={0}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
          )}
        >
          ...
        </Button>
      );
      for (let i = (page - 5); i <= page; i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={clsx(
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              
              i === currentPage &&
                'bg-indigo-600 text-white hover:text-gray-900'
            )}
          >
            {i}
          </Button>
        );
      }
    }else{
      pageButtons.push(
        <Button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
            
            1 === currentPage &&
              'bg-indigo-600 text-white hover:text-gray-900'
          )}
        >
          {1}
        </Button>
      );
      pageButtons.push(
        <Button
          key={0}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
          )}
        >
          ...
        </Button>
      );
      for (let i = (currentPage - 2); i < currentPage; i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={clsx(
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              
              i === currentPage &&
                'bg-indigo-600 text-white hover:text-gray-900'
            )}
          >
            {i}
          </Button>
        );
      }
      pageButtons.push(
        <Button
          key={currentPage}
          onClick={() => setCurrentPage(currentPage)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
            
            currentPage === currentPage &&
              'bg-indigo-600 text-white hover:text-gray-900'
          )}
        >
          {currentPage}
        </Button>
      );
      for (let i = (currentPage + 1); i <= (currentPage + 2); i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={clsx(
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              
              i === currentPage &&
                'bg-indigo-600 text-white hover:text-gray-900'
            )}
          >
            {i}
          </Button>
        );
      }
      pageButtons.push(
        <Button
          key={-1}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
          )}
        >
          ...
        </Button>
      );
      pageButtons.push(
        <Button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
            
            page === currentPage &&
              'bg-indigo-600 text-white hover:text-gray-900'
          )}
        >
          {page}
        </Button>
      );
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          onClick={() => setCurrentPage(1)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
          )}
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
          )}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
          )}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setCurrentPage(lastPage)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
          )}
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{from}</span> to{' '}
            <span className="font-medium">{to}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md bg-white shadow-sm"
          >
            <Button
              onClick={() => setCurrentPage(1)}
              className={clsx(
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              )}
            >
              <ChevronDoubleLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              className={clsx(
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              )}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            {pageButtons}
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              className={clsx(
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              )}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setCurrentPage(lastPage)}
              className={clsx(
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0',
              )}
            >
              <ChevronDoubleRightIcon className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
