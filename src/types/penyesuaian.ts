export interface List {
  id: number;
  kode: string;
  jenis: string;
  rekening: string;
  debit: string;
  kredit: string;
}

export interface Request {
  jenis_jurnal: string;
  kode_rekening_id: {
    debit: number;
    kredit: number;
  };
}
