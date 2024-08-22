import { create } from 'zustand';
import type { Row } from '@/types/table';


interface Props {
    rows: Row[];
    setRows: (rows: Row[]) => void;
}

const useAccount = create<Props>((set) => ({
  rows: [],
  setRows: (rows: Row[]) => set({ rows: rows }),
}));

export default useAccount;
