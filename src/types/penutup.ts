export interface List {
    id: number;
    kode: string;
    jenis: string;
    rekening: string;
    debit: string;
    kredit: string;
  }
  
  export interface request {
    kode: 'JU';
    jenis: string;
    debit: number;
    kredit: number;
  }