export interface Menu {
  id?: number;
  name: string;
  href: string;
  icon?: any;
  initial?: string;
  count?: number | string;
  current?: boolean;
  children?: Menu[];
}
