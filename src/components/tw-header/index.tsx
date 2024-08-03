import clsx from 'clsx';
import React from 'react';
import TwButton from '../tw-button';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import type { Action } from '@/types/header';
import Link from 'next/link';
interface TwHeader {
  title?: string;
  className?: string;
  button?: Action[];
}

export default function TwHeader(props: TwHeader) {
  const { title = 'Header', className = '', button = null } = props;

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      <div className="flex justify-between space-x-2">
        {button &&
          button.map((item, index) => (
            <Link key={index} href={item.href}>
              <TwButton key={index} {...item} />
            </Link>
          ))}
      </div>
    </div>
  );
}
