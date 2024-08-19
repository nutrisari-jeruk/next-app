export interface List {
  id: number;
  kr050_id: number;
  account_050: string;
  sap13_id: number | null;
  account_sap13: string | null;
}

export interface Data {
  label: string;
  value: number;
}

export interface Payload {
  data: Data[];
}
