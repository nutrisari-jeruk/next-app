'use client';

import { useEffect, useState } from 'react';
import { TwButton } from '@/components';
import type { Column, Row } from '@/types/table';
import type { List } from '@/types/sap13/sap13';
import ShowSAP13 from '../show-sap13';
import DataTable from "../components/datatable"
import Search from '../components/search';
import Pagination from '../components/pagination';

interface Props {
  searchField?: string;
  data: List[];
}
export default function Table({ searchField = '', data }: Props) {
  const rows: Row[] = data?.map((item: List) => {
    return {
      id: item.id,
      text: item.text,
      account_code: item.account_code,
      account_description: item.account_description,
      level: item.level,
      parent_id: item.parent_id,
    };
  });
  const [dataTable, setDataTable] = useState(rows);
  const [loader, setLoader] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchData, setSearchData] = useState(rows);
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  function View(data: Row) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
        <TwButton size="xs" title="View" onClick={() => setIsOpen(true)} />
        <ShowSAP13
          data={data}
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
        />
      </>
    );
  }

  const columns: Column[] = [
    {
      label: 'No.',
      accessor: '#',
      sortable: false,
    },
    {
      label: 'Account Code',
      accessor: 'account_code',
      sortable: true,
    },
    {
      label: 'Account Description',
      accessor: 'account_description',
      sortable: true,
    },
    {
      label: 'View',
      accessor: 'id',
      sortable: false,
      render: (item: Row) => {
        return <View data={item} />;
      },
    },
  ];

  useEffect(() => {
    setLoader(false);
    setItemsPerPage(10);
    setCurrentPage(1);
    setDataTable(rows);
    
    [dataTable];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return <div>Loading</div>;
  }

  let lastPage = 1;

  let paginatedData : Row[] = [];
  
  if(searchData.length > 0){
    if (sortField) {
      const sorted = [...searchData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (order === 'asc' ? 1 : -1)
        );
      });
      
      paginatedData = sorted.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    }else{
      paginatedData = searchData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    }

    lastPage = Math.ceil(searchData.length / itemsPerPage);
  
    if(currentPage < 1){
      setCurrentPage(1);
    }
  
    if(currentPage > lastPage){
      setCurrentPage(lastPage);
    }
  }

  return (
    <div className="flex w-full flex-col space-y-2">
      <Search 
        placeholder="Search" 
        data={dataTable} 
        setSearchData={setSearchData} />
      <DataTable 
        data={paginatedData} 
        columns={columns} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage}
        sortField={sortField}
        order={order}
        setOrder={setOrder}
        setSortField={setSortField}
        />
      <Pagination 
        data={searchData} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
        lastPage={lastPage} 
        setCurrentPage={setCurrentPage}/>
    </div>
  );
}
