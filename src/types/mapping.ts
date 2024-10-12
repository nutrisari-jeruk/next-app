export interface List {
  id: number | null;
  kr050_id: number | null;
  account_050: string | null;
  sap13_id: number | null;
  account_sap13: string | null;
}

export interface BurdenAssetList {
  id: number | null;
  sap13_id_expend: number | null;
  account_sap13_expend: string | null;
  sap13_id_burden_asset: number | null;
  account_sap13_burden_asset: string | null;
}

export interface Data {
  label: string;
  value: number;
}

export interface Payload {
  data: Data[];
}
