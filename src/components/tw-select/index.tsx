'use client';
import { Option } from '@/types/option';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';

interface TwSelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label: string;
  icon?: React.ReactNode;
  selectedData?: Option;
  placeHolder?: string;
  isError?: boolean;
  errorMessage?: string | string[];
}

export default function TwSelect(props: TwSelect) {
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

  const [selected, setSelected] = useState(options[0]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              {label}
            </Label>
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  {icon}
                  <span className="ml-3 block truncate">{selected.label}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <ListboxOption
                      key={option.value}
                      className={({ focus }) =>
                        clsx(
                          focus ? 'bg-indigo-600 text-white' : '',
                          !focus ? 'text-gray-900' : '',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={option}
                    >
                      {({ selected, focus }) => (
                        <>
                          <div className="flex items-center">
                            {icon}
                            <span
                              className={clsx(
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate',
                              )}
                            >
                              {option.label}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={clsx(
                                focus ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
