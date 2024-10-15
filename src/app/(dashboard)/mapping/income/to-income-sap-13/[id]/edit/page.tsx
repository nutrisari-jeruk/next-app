import Form from '@/app/(dashboard)/mapping/income/to-income-sap-13/ui/form/edit';
import { TwHeader } from '@/components';
import useSap13 from '@/hooks/sap13';
import type { TreeNode } from '@/types/tree-view';

export default async function Page({ params }: { params: { id: string } }) {
  const treeData: TreeNode[] = await useSap13({ accounts: ['4'] });

  return (
    <>
      <TwHeader title="Buat Mapping" />
      <Form {...{ treeData, params }} />
    </>
  );
}
