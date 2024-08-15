import React from 'react';
import { Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';

interface TwInput extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isError?: boolean;
  required?: boolean;
  errorMessage?: string | string[];
  className?: string;
}

export default function TwInput(props: TwInput) {
  const randomId = Math.random().toString(36).slice(2);
  const {
    name = `input-${randomId}`,
    label = '',
    isError = false,
    icon = null,
    iconPosition = 'left',
    errorMessage = 'Error message',
    className = '',
    ...attr
  } = props;

  return (
    <Field className={clsx('w-full space-y-1', className)}>
      <Label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {attr.required && <span className="text-red-500">*</span>}
      </Label>
      <div className={clsx('relative rounded-md shadow-sm')}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          {iconPosition === 'left' && icon}
        </div>
        <Input
          name={name}
          id={name}
          className={clsx(
            isError &&
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
            attr.disabled ||
              (attr.readOnly && 'cursor-not-allowed bg-gray-100'),
            icon && (iconPosition === 'left' ? 'pl-10' : 'pr-10'),
            'block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
          )}
          aria-invalid={isError}
          aria-describedby={`${name}-error`}
          {...attr}
        />

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          {iconPosition === 'right' && icon}
        </div>
      </div>
      {isError && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {errorMessage}
        </p>
      )}
    </Field>
  );
}
