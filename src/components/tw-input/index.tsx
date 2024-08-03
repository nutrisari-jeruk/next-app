import React from 'react';
import { Input as HeadlessInput } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface TwInput extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  icon?: React.ReactNode;
  isError?: boolean;
  required?: boolean;
  errorMessage?: string | string[];
  className?: string;
}

export default function TwInput(props: TwInput) {
  const randomId = Math.random().toString(36).slice(2);
  const {
    name = `input-${randomId}`,
    label = 'Input',
    isError = false,
    icon = null,
    errorMessage = 'Error message',
    ...attr
  } = props;

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {attr.required && <span className="text-red-500">* </span>}
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        {icon}
        <HeadlessInput
          name={name}
          id={name}
          className={clsx(
            isError &&
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
            attr.disabled && 'cursor-not-allowed bg-gray-100',
            'block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
          )}
          aria-invalid={isError}
          aria-describedby={`${name}-error`}
          {...attr}
        />
      </div>
      {isError && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
