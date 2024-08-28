export interface Column {
  label: string;
  accessor: string;
  sortable?: boolean;
  width?: string
}

export interface Row {
  [key: string]: string | number | boolean | null;
}
