export interface TreeNode {
  id: number;
  text: string;
  parent_id: number | null;
  is_selectable: boolean;
  nodes?: TreeNode[];
}
