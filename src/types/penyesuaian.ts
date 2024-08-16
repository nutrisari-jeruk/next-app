export interface List {
  id: number;
  kode: string;
  jenis: string;
  rekening: string;
  debit: string;
  credit: string;
}

export interface PostRequest {
  jenis_jurnal: string;
  kode_rekening_id: {
    debit: number;
    credit: number;
  };
}
