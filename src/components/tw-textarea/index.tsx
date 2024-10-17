import { Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  label?: string;
  rows?: number;
  isError?: boolean;
  errorMessage?: string | string[];
  className?: string;
}
export default function TwTextarea(props: Props) {
  const randomId = Math.random().toString(36).slice(2);
  const {
    name = `textarea-${randomId}`,
    label = 'Description',
    isError = false,
    errorMessage = 'Error message',
    className = '',
    rows = 3,
    ...attr
  } = props;

  return (
    <div className="w-full">
      <Field>
        <Label className="block text-sm font-medium leading-6 text-gray-900">
          {label} {attr.required && <span className="text-red-500">*</span>}
        </Label>
        <Textarea
          name={name}
          {...attr}
          className={clsx(
            isError &&
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
            attr.disabled && 'cursor-not-allowed bg-gray-100',
            attr.readOnly && 'bg-gray-100',
            'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          )}
          aria-invalid={isError}
          aria-describedby={`${name}-error`}
          rows={rows}
        />
        {isError && (
          <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
            {errorMessage}
          </p>
        )}
      </Field>
    </div>
  );
}
