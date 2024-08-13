import { TwHeader } from '@/components';
import useSap13 from '@/hooks/sap13';
import CreatePenutupForm from '../ui/create-form';
import Sap13Modal from '../components/sap13-modal';
import type { TreeNode } from '@/types/tree-view';

export default async function Page() {
  const treeData: TreeNode[] = await useSap13();

  return (
    <>
      <TwHeader title="Tambah Penutup" />
      <CreatePenutupForm treeData={treeData} />
    </>
  );
}
