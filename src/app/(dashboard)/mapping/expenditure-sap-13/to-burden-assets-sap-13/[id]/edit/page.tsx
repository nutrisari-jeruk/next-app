import Form from '@/app/(dashboard)/mapping/expenditure-sap-13/to-burden-assets-sap-13/ui/form/edit';
import { TwHeader } from '@/components';
import useSap13 from '@/hooks/sap13';
import type { TreeNode } from '@/types/tree-view';

export default async function Page({ params }: { params: { id: string } }) {
  const treeData: TreeNode[] = await useSap13({accounts: ['8']});

  return (
    <>
      <TwHeader title="Buat Mapping" />
      <Form {...{ treeData, params }} />
    </>
  );
}
