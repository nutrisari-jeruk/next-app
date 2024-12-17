import { TwHeader } from '@/components';
import CreateForm from '../ui/create-form';
import type { TreeNode } from '@/types/tree-view';
import { fetchSap13 } from '@/hooks/sap13';

export default async function Page() {
  const treeData: TreeNode[] = await fetchSap13();

  return (
    <>
      <TwHeader title="Tambah Master Jurnal Penyesuaian" />
      <CreateForm treeData={treeData} />
    </>
  );
}
