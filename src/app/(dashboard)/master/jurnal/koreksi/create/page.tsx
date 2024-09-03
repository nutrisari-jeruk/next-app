import useSap13 from '@/hooks/sap13';
import CreateKoreksiForm from '../ui/create-form';
import Sap13Modal from '../components/sap13-modal';
import type { TreeNode } from '@/types/tree-view';
import { TwHeader } from '@/components';

export default async function Page() {
  const treeData: TreeNode[] = await useSap13();

  return (
    <>
      <TwHeader title="Tambah Koreksi" />
      <CreateKoreksiForm treeData={treeData} />
    </>
  );
}