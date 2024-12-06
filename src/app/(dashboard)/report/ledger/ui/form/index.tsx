'use client';

import Sap13Modal from '../../components/sap13-modal';
import useFetchSap13 from '@/hooks/fetchSap13';
import { useState } from 'react';
import { TwButton, TwInput, TwSelect } from '@/components';
import { useSession } from 'next-auth/react';
import type { Option } from '@/types/option';
import type { TreeNode } from '@/types/tree-view';

export default function Form({ fiscalYear }: { fiscalYear: number[] }) {
  const { data: session } = useSession();

  const today = new Date().toISOString().split('T')[0];
  const { data: treeData } = useFetchSap13();

  const types: Option[] = [
    {
      label: 'Tahunan',
      value: 'yearly',
    },
    {
      label: 'Bulanan',
      value: 'monthly',
    },
    {
      label: 'Rentang Tanggal',
      value: 'date_range',
    },
  ];

  const years: Option[] = fiscalYear.map((year) => ({
    label: year.toString(),
    value: year.toString(),
  }));

  const months: Option[] = [
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];

  const [isSapModalOpen, setIsSapModalOpen] = useState(false);
  const [sap13, setSap13] = useState<TreeNode>();
  const [type, setType] = useState('yearly');
  const [typeError, setTypeError] = useState('');
  const [periods, setPeriods] = useState<Option[]>(years);
  const [period, setPeriod] = useState(years[0].value);
  const [periodError, setPeriodError] = useState('');
  const [sap13Error, setSap13Error] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [isShown, setIsShown] = useState(false);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeError('');

    if (e.target.value === 'yearly') {
      setType('yearly');
      setPeriods(years);
      setIsShown(false);
    }

    if (e.target.value === 'monthly') {
      setType('monthly');
      setPeriods(months);
      setPeriod(months[0].value);
      setIsShown(false);
    }

    if (e.target.value === 'date_range') {
      setType('date_range');
      setEndDate(today);
      setEndDate(today);
      setIsShown(true);
    }
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
    setPeriodError('');
  };

  const handleAccountSelect = (node: TreeNode) => {
    setIsSapModalOpen(false);
    setSap13(node);
    setSap13Error('');
  };

  const show = () => {
    const id = sap13?.id;

    if (!type) {
      setTypeError('Pilih tipe periode terlebih dahulu');
      return;
    }

    if (!period) {
      setPeriodError('Pilih periode terlebih dahulu');
      return;
    }

    if (!id) {
      setSap13Error('Pilih kode rekening terlebih dahulu');
      return;
    }

    let url = `${process.env.NEXT_PUBLIC_REPORT_URL_V1}/ledger?type=${type}&sap13_id=${id}`;

    if (type === 'yearly') {
      url += `&period=${period}`;
    }

    if (type === 'monthly') {
      const currentFiscalYear = session?.user?.fiscal_year;
      url += `&period=${currentFiscalYear}-${period}`;
    }

    if (type === 'date_range') {
      url += `&start_date=${startDate}&end_date=${endDate}`;
    }

    window.open(url);
  };

  return (
    <>
      <TwSelect
        label="Pilih Tipe Periode"
        name="type"
        options={types}
        defaultValue="yearly"
        onChange={handleTypeChange}
        isError={!!typeError}
        errorMessage={typeError}
      />

      <TwSelect
        label="Pilih Periode"
        name="period"
        options={periods}
        defaultValue={periods[0].value}
        onChange={handlePeriodChange}
        isError={!!periodError}
        errorMessage={periodError}
        hidden={isShown}
      />

      <TwInput
        type="date"
        name="start_date"
        className="w-full"
        label="Dari Tanggal"
        placeholder="Dari tanggal"
        defaultValue={startDate}
        min={`${fiscalYear}-01-01`}
        max={`${fiscalYear}-12-31`}
        onChange={(e) => setStartDate(e.target.value)}
        hidden={!isShown}
      />

      <TwInput
        type="date"
        name="end_date"
        className="w-full"
        label="Sampai Tanggal"
        placeholder="Sampai tanggal"
        defaultValue={endDate}
        min={startDate}
        max={`${fiscalYear}-12-31`}
        onChange={(e) => setEndDate(e.target.value)}
        hidden={!isShown}
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

      <TwButton title="Tampilkan" onClick={show} />

      <Sap13Modal
        treeData={treeData}
        isModalOpen={isSapModalOpen}
        onClose={() => setIsSapModalOpen(false)}
        onNodeSelect={handleAccountSelect}
      />
    </>
  );
}
