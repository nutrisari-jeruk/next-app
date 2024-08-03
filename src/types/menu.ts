import { ComponentType, SVGProps } from "react";

export interface Menu {
  id?: number;
  name: string;
  href: string;
  current: boolean;
  icon?: any;
  initial?: string;
  children?: Menu[];
  count?: number;
}
