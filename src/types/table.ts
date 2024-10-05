export interface Column {
  label: string;
  accessor: string;
  sortable?: boolean;
  width?: string;
  render?: (item: Row) => any;
}

export interface Row {
  [key: string]: string | number | boolean | Record<string, any> | null;
}
