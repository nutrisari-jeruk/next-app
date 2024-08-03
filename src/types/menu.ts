import { ComponentType, SVGProps } from "react";

export interface Menu {
  id?: number;
  name: string;
  href: string;
  icon?: any;
  initial?: string;
  count?: number;
  children?: Menu[];
}
