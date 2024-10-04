import React from "react";

export interface Column {
  label: string;
  accessor: string;
  sortable?: boolean;
  width?: string;
  render?: React.ReactNode;
}

export interface Row {
  [key: string]: string | number | boolean | null;
}
