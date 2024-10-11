import { TwHeader } from '@/components';
import useSap13 from '@/hooks/sap13';
import CreateForm from '../ui/create-form';
import type { TreeNode } from '@/types/tree-view';

export default async function Page() {
  const treeData: TreeNode[] = await useSap13();

  return (
    <>
      <TwHeader title="Tambah Master Jurnal Penyesuaian" />
      <CreateForm treeData={treeData} />
    </>
  );
}
