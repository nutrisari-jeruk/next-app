'use client';

import { useState } from 'react';
import { TwButton, TwInput, TwSelect } from '@/components';
import Sap13Modal from '../../components/sap13-modal';
import useFetchSap13 from '@/hooks/fetchSap13';
import type { Option } from '@/types/option';
import type { TreeNode } from '@/types/tree-view';

export default function Form() {
  const [isSapModalOpen, setIsSapModalOpen] = useState(false);
  const [sap13, setSap13] = useState<TreeNode>();

  const options: Option[] = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];
  const { data: treeData } = useFetchSap13();

  const handleAccountSelect = (node: TreeNode) => {
    setIsSapModalOpen(false);
    setSap13(node);
  };

  return (
    <>
      <div className="mt-4 space-y-2 bg-white p-4 rounded">
        <TwSelect
          label="Pilih Periode"
          name="period"
          options={options}
          className="max-w-xs"
        />
        <TwInput
          id="sap13_id"
          name="sap13_id"
          className="w-full cursor-pointer"
          label="Kode Rekening SAP 13"
          placeholder="Kode SAP 13 level 5"
          value={sap13?.text!}
          onClick={() => setIsSapModalOpen(true)}
          readOnly
        />
        <TwButton title="Cetak" />
      </div>

      <Sap13Modal
        treeData={treeData}
        isModalOpen={isSapModalOpen}
        onClose={() => setIsSapModalOpen(false)}
        onNodeSelect={handleAccountSelect}
      />
    </>
  );
}
