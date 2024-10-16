import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type {
  JournalKindAutoComplete,
  Option,
} from '@/types/journal-entry/general';

interface Props {
  label: string;
  name: string;
  staticOptions?: Option[];
  getServerOptions?: (value: string) => Promise<JournalKindAutoComplete[]>;
  selectedOption: Option | null;
  setSelectedOption: (value: Option) => void;
  isError?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  errorMessage?: string | string[];
}

export default function JournalKindAutoComplete(props: Props) {
  const {
    label = 'comboBox',
    name,
    staticOptions = [],
    getServerOptions = null,
    selectedOption,
    setSelectedOption,
    isError,
    errorMessage,
    placeholder = '',
    disabled = false,
    readonly = false,
  } = props;

  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    getOptions();
  }, [query]);

  const getOptions = async () => {
    if (getServerOptions && query?.length >= 3) {
      const data = await getServerOptions(query);
      const optionsResult = data.map((option) => ({
        value: `${option.journal_code} - ${option.journal_kind}`,
        label: `${option.journal_code} - ${option.journal_kind}`,
        accounts: option.accounts,
        selected: false,
        id: option.id,
      }));
      setOptions(optionsResult);
    } else {
      setOptions(staticOptions);
    }
  };
  const filteredOptions =
    query === '' || query?.length < 3
      ? []
      : options?.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        }) || [];

  return (
    <Combobox
      value={selectedOption}
      onChange={(option: Option) => {
        setQuery('');
        setSelectedOption(option);
      }}
    >
      <Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </Label>
      <div className="relative mt-2">
        <ComboboxInput
          name={name}
          id={name}
          className={clsx(
            isError &&
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
            (disabled || readonly) && 'cursor-not-allowed bg-gray-100',
            'w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          )}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          displayValue={(option: Option) => option?.label}
          placeholder={placeholder || ''}
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
                    'relative cursor-default select-none py-2 pl-3 pr-9',
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
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          focus ? 'text-white' : 'text-indigo-600',
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
      {isError && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {errorMessage}
        </p>
      )}
    </Combobox>
  );
}
