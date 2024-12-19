import { create } from 'zustand';
import type { Params } from '@/types/params';
import type { Row } from '@/types/table';

interface Props {
  rows: Row[];
  params: Params;
}

const useRowStore = create<Props>((set) => ({
  rows: [],
  params: {
    page: '1',
    rowsPerPage: '10',
    searchField: '',
    searchValue: '',
    mapping: '-1',
  },
  setRows: () => set((state) => ({ rows: state.rows })),
  setParams: () => set((state) => ({ params: state.params })),
}));

export default useRowStore;
