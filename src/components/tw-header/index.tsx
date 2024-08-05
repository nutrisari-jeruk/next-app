import clsx from 'clsx';
import React from 'react';
import TwButton from '../tw-button';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
interface TwHeader {
  title?: string;
  className?: string;
}

export default function TwHeader(props: TwHeader) {
  const { title = 'Header', className = '' } = props;

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          {title}
        </h2>
      </div>
    </div>
  );
}
