'use client';
import { Option } from '@/types/option';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

interface TwComboBox extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label: string;
  icon?: React.ReactNode;
  selectedData?: Option;
  placeHolder?: string;
  isError?: boolean;
  errorMessage?: string | string[];
}
export default function TwComboBox(props: TwComboBox) {
  const {
    options = [],
    icon = null,
    selectedData = null,
    label = '',
    isError = false,
    placeHolder = '',
    errorMessage = '',
    ...attr
  } = props;
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(selectedData);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (selectedData) {
      setSelectedOption(selectedData);
    }
  }, [selectedData]);
  return (
    <Field className={clsx(attr.disabled && 'cursor-not-allowed')}>
      <Combobox
        as="div"
        value={selectedOption}
        defaultValue={selectedData}
        onChange={(option) => {
          setQuery('');
          setSelectedOption(option);
        }}
      >
        <Label
          htmlFor={!attr.disabled ? attr.name : ''}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </Label>
        <div className="relative mt-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            {icon}
          </div>
          <ComboboxInput
            name={attr.name}
            className={clsx(
              attr.disabled ? 'pointer-events-none bg-gray-100' : 'bg-white',
              isError &&
                'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
              icon ? 'pl-10' : 'pl-3',
              'w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
            )}
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setQuery('')}
            placeholder={placeHolder}
            displayValue={(option: Option) => option?.label}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>

          {filteredOptions.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.map((option) => (
                <ComboboxOption
                  key={option.value}
                  value={option}
                  className={({ focus }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-8 pr-4',
                      focus ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    )
                  }
                >
                  {({ focus, selected }) => (
                    <>
                      <span
                        className={clsx(
                          'block truncate',
                          selected && 'font-semibold',
                        )}
                      >
                        {option.label}
                      </span>

                      {selected && (
                        <span
                          className={clsx(
                            'absolute inset-y-0 left-0 flex items-center pl-1.5',
                            focus ? 'text-white' : 'text-indigo-600',
                          )}
                        >
                          {icon}
                        </span>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
      {isError && (
        <p className="mt-2 text-sm text-red-600" id={`${attr.name}-error`}>
          {errorMessage}
        </p>
      )}
    </Field>
  );
}
