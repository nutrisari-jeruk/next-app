export interface Column {
    label: string;
    accessor: string;
    sortable?: boolean;
}

export interface Row {
    [key: string]: string | number;
}