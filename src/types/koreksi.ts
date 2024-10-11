export interface List {
    id: number;
    journal_kind_kode: string;
    journal_kind_jenis: string;
    accounts: KodeRekening[];
  }
  
  export interface KodeRekening {
    id: number;
    code: string;
    debit?: string | null;
    credit?: string | null;
  }
  
  export interface Payload {
    jenis_journal_kind: string;
    accounts_id: {
      debit: number;
      credit: number;
    };
  }
  