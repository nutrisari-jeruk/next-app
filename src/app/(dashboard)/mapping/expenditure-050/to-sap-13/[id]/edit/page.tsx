import Form from '@/app/(dashboard)/mapping/expenditure-050/to-sap-13/ui/form/edit';
import { TwHeader } from '@/components';
import useSap13 from '@/hooks/sap13';
import type { TreeNode } from '@/types/tree-view';

export default async function Page() {
  const treeData: TreeNode[] = await useSap13();
  const account = {
    kr_050_id: 6,
    account_050: '5.1.01.01.01.0001 - Belanja Gaji Pokok PNS',
  };

  return (
    <div>
      <TwHeader title="Tambah Mapping" />
      <Form {...{ treeData, account }} />
    </div>
  );
}
