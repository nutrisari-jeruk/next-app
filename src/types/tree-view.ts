export interface TreeNode {
  id: number;
  text: string;
  parent_id: number;
  is_selectable: boolean;
  nodes?: TreeNode[];
}
