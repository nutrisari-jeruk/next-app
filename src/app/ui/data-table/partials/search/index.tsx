'use client';

import { TwInput } from '@/components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({
  placeholder,
  searchField,
}: {
  placeholder: string;
  searchField: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('searchField', searchField);
      params.set('searchValue', term);
    } else {
      params.delete('searchValue');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="w-1/4">
      <TwInput
        id="search"
        name="search"
        placeholder={placeholder}
        onChange={(e) => handleSearch((e.target as HTMLInputElement).value)}
        icon={<MagnifyingGlassIcon />}
        defaultValue={searchParams.get('searchValue')?.toString()}
      />
    </div>
  );
}
