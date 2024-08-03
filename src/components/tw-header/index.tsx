import clsx from 'clsx';
import React from 'react';
import TwButton from '../tw-button';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface TwHeader {
  title?: string;
  className?: string;
  button?: React.ReactNode[];
}

export default function TwHeader(props: TwHeader) {
  const { title = 'Header', className = '', button = null } = props;

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      <div className="flex justify-between">
        {button?.map((item, index) => item)}
      </div>
    </div>
  );
}
