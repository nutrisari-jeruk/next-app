import Form from '@/app/(dashboard)/mapping/expenditure-050/to-expenditure-sap-13/ui/form/edit';
import { TwHeader } from '@/components';
import useSap13 from '@/hooks/sap13';
import type { TreeNode } from '@/types/tree-view';

export default async function Page({ params }: { params: { id: string } }) {
  const treeData: TreeNode[] = await useSap13({accounts: ['5']});

  return (
    <>
      <TwHeader title="Buat Mapping" />
      <Form {...{ treeData, params }} />
    </>
  );
}
