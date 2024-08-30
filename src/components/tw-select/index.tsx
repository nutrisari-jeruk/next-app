import clsx from 'clsx';
import { Field, Label, Select } from '@headlessui/react';
import type { Option } from '@/types/option';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isError?: boolean;
  required?: boolean;
  errorMessage?: string | string[];
  className?: string;
  options?: Option[];
  placeholder?: string;
  defaultValue?: string | number;
}

export default function TwSelect(props: Props) {
  const randomId = Math.random().toString(36).slice(2);
  const {
    name = `input-${randomId}`,
    label = '',
    isError = false,
    icon = null,
    iconPosition = 'left',
    errorMessage = 'Error message',
    className = '',
    options = [],
    placeholder = '',
    defaultValue,
    ...attr
  } = props;

  return (
    <Field className={clsx('w-full space-y-1', className)}>
      <Label
        htmlFor={name}
        className={clsx(
          'block text-sm font-medium leading-6',
          isError ? 'text-red-500' : 'text-gray-900',
        )}
      >
        {label} {attr.required && <span className="text-red-500">*</span>}
      </Label>
      <div className={clsx('relative rounded-md shadow-sm')}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          <div className="pointer-events-none h-4 w-4">
            {iconPosition === 'left' && icon}
          </div>
        </div>
        <Select
          name={name}
          id={name}
          className={clsx(
            isError &&
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
            attr.disabled && 'cursor-not-allowed bg-gray-100',
            icon && (iconPosition === 'left' ? 'pl-8' : 'pr-8'),
            'block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
          )}
          aria-invalid={isError}
          aria-describedby={`${name}-error`}
          defaultValue={defaultValue}
          {...attr}
        >
          {!!placeholder && <option hidden>{placeholder}</option>}
          {!!options.length &&
            options.map((option, index) => (
              <option key={index} value={option?.value! as string}>
                {option?.label}
              </option>
            ))}
        </Select>

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
