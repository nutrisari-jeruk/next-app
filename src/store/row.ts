import { create } from 'zustand';
import type { Params } from '@/types/params';
import type { Row } from '@/types/table';

interface Props {
  rows: Row[];
  params: Params;
  setRows: (rows: Row[]) => void;
  setParams: (params: Params) => void;
}

const useRowStore = create<Props>((set) => ({
  rows: [],
  params: {
    page: '1',
    rowsPerPage: '10',
    searchField: '',
    searchValue: '',
  },
  setRows: (rows: Row[]) => set({ rows: rows }),
  setParams: (params: Params) => set({ params: params }),
}));

export default useRowStore;
