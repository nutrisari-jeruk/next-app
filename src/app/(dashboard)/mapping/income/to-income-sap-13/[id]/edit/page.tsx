import Form from '@/app/(dashboard)/mapping/income/to-income-sap-13/ui/form/edit';
import { TwHeader } from '@/components';
import { fetchSap13 } from '@/hooks/sap13';

import type { TreeNode } from '@/types/tree-view';

export default async function Page({ params }: { params: { id: string } }) {
  const treeData: TreeNode[] = await fetchSap13({ accounts: ['4'] });

  return (
    <>
      <TwHeader title="Buat Mapping" />
      <Form {...{ treeData, params }} />
    </>
  );
}
