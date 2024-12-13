import Form from '@/app/(dashboard)/mapping/expenditure-sap-13/to-burden-assets-sap-13/ui/form/edit';
import { TwHeader } from '@/components';
import { fetchSap13 } from '@/hooks/sap13';
import type { TreeNode } from '@/types/tree-view';

export default async function Page({ params }: { params: { id: string } }) {
  const treeData: TreeNode[] = await fetchSap13({ accounts: ['1', '8'] });

  return (
    <>
      <TwHeader title="Buat Mapping" />
      <Form {...{ treeData, params }} />
    </>
  );
}
