export interface TreeNode {
  id: string;
  text: string;
  parent_id: string;
  selectable: boolean;
  nodes?: TreeNode[];
}
