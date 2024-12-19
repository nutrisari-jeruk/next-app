'use client';

import { TwSelect } from '@/components';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MappingFilter({ mapping }: { mapping: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('mapping', mapping);

    if (term) {
      params.set('mapping', term);
    } else {
      params.delete('mapping');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <div className="w-1/4">
      <TwSelect
        defaultValue={searchParams.get('mapping')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        icon={<FunnelIcon className="h-4 w-4" />}
        options={[
          { value: '-1', label: 'Semua' },
          { value: '0', label: 'Belum' },
          { value: '1', label: 'Sudah' },
        ]}
      />
    </div>
  );
}
