'use client';

import { TwInput } from '@/components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import type { List } from '@/types/sap13/sap13';
import { Row } from '@/types/table';

export default function Search({
  placeholder,
  data,
  setSearchData,
}: {
  placeholder: string;
  data: Row[];
  setSearchData : any;
}) {

  const handleSearch = useDebouncedCallback((searchField: string) => {
    if(searchField){
      var searchData = data.filter(
        item => item['account_code']?.toString().toLowerCase().includes(searchField.toLowerCase()) ||
        item['account_description']?.toString().toLowerCase().includes(searchField.toLowerCase())
      );
      setSearchData(searchData);
    }else{
      setSearchData(data);
    }
  }, 500);

  return (
    <div className="w-1/4">
      <TwInput
        id="search"
        name="search"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        icon={<MagnifyingGlassIcon />}
      />
    </div>
  );
}
