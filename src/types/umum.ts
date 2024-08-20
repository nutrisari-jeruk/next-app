export interface List {
  id: number;
  jurnal_kode: string;
  jurnal_jenis: string;
  kode_rekening: kodeRekening[];
}

export interface kodeRekening {
  id: number;
  code: string;
  debit?: string | null;
  credit?: string | null;
}

export interface PostRequest {
  jenis_jurnal: string;
  kode_rekening_id: {
    debit: number;
    credit: number;
  };
}
