export interface TreeNode {
  id: string;
  text: string;
  parent_id: string;
  is_selectable: boolean;
  nodes?: TreeNode[];
}
