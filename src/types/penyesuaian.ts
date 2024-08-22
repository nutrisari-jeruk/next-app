export interface List {
  id: number;
  jurnal_kode: string;
  jurnal_jenis: string;
  kode_rekening: KodeRekening[];
}

export interface KodeRekening {
  id: number;
  code: string;
  debit?: string | null;
  credit?: string | null;
}

export interface Payload {
  jenis_jurnal: string;
  kode_rekening_id: {
    debit: number;
    credit: number;
  };
}
