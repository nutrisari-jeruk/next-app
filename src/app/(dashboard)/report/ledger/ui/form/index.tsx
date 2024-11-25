'use client';

import { useState } from 'react';
import { TwButton, TwInput, TwSelect } from '@/components';
import { useSession } from 'next-auth/react';
import Sap13Modal from '../../components/sap13-modal';
import useFetchSap13 from '@/hooks/fetchSap13';
import type { Option } from '@/types/option';
import type { TreeNode } from '@/types/tree-view';

export default function Form() {
  const { data: session } = useSession();

  const [isSapModalOpen, setIsSapModalOpen] = useState(false);
  const [month, setMonth] = useState('');
  const [sap13, setSap13] = useState<TreeNode>();
  const [periodError, setPeriodError] = useState('');
  const [sap13Error, setSap13Error] = useState('');

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
    setSap13Error('');
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value)
    setPeriodError('')
  }

  const show = () => {
    const period = session?.user?.fiscal_year! + '-' + month!;
    const id = sap13?.id!;

    if (!month) {
      setPeriodError('Pilih periode terlebih dahulu');
      return;
    }

    if (!id) {
      setSap13Error('Pilih kode rekening terlebih dahulu');
      return;
    }

    window.open(
      `${process.env.NEXT_PUBLIC_REPORT_URL_V1}/ledger?period=${period}&sap13_id=${id}`,
    );
  };

  return (
    <>
      <TwSelect
        label="Pilih Periode"
        name="period"
        placeholder="Pilih Periode"
        options={options}
        onChange={handlePeriodChange}
        isError={!!periodError}
        errorMessage={periodError}
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
        isError={!!sap13Error}
        errorMessage={sap13Error}
      />

      <TwButton title="Cetak" onClick={show} />

      <Sap13Modal
        treeData={treeData}
        isModalOpen={isSapModalOpen}
        onClose={() => setIsSapModalOpen(false)}
        onNodeSelect={handleAccountSelect}
      />
    </>
  );
}
