import { TwHeader } from '@/components';
import CreateForm from '../create-form';
import type { TreeNode } from '@/types/tree-view';
import { fetchSap13Reverse } from '@/hooks/sap13';

export default async function Page() {
  const treeData: TreeNode[] = await fetchSap13Reverse();

  return (
    <>
      <TwHeader title="Tambah Master SAP 13" />
      <CreateForm treeData={treeData} />
    </>
  );
}
