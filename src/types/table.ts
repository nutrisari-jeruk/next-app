export interface Column {
    label: string;
    accessor: string;
    sortable?: boolean;
    width?: string;
    render?: (item: Row) => React.ReactNode;
}

export interface Row {
    [key: string]: string | number | boolean | null;
}