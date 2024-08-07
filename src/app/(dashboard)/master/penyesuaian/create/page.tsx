'use client';

import { TwButton, TwHeader, TwInput, TwTreeView } from '@/components';
import { TreeNode } from '@/types/tree-view';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  FolderPlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [debit, setDebit] = useState('');
  const [kredit, setKredit] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [kodeRekeningSearchQuery, setKodeRekeningSearchQuery] = useState('');
  const [searchKodeRekeningValue, setKodeRekeningSearchValue] = useState('');
  const [kodeRekeningSelectedNode, setKodeRekeningSelectedNode] = useState(
    {} as TreeNode,
  );
  const [activeInput, setActiveInput] = useState<'debit' | 'kredit' | ''>('');
  const treeData = [
    {
      id: '4.1',
      text: '4 - Pendapatan',
      kode_rekening: '4',
      uraian_rekening: 'Pendapatan',
      parent_id: '4.0',
      selectable: false,
      nodes: [
        {
          id: '4.2',
          text: '4.1 - Jasa Layanan',
          kode_rekening: '4.1',
          uraian_rekening: 'Jasa Layanan',
          parent_id: '4.1',
          selectable: false,
          nodes: [
            {
              id: '4.3',
              text: '4.1.01 - Jasa Layanan Kesehatan',
              kode_rekening: '4.1.01',
              uraian_rekening: 'Jasa Layanan Kesehatan',
              parent_id: '4.2',
              selectable: false,
              nodes: [
                {
                  id: '4.4',
                  text: '4.1.01.01 - Pelayanan Kesehatan',
                  kode_rekening: '4.1.01.01',
                  uraian_rekening: 'Pelayanan Kesehatan',
                  parent_id: '4.3',
                  selectable: false,
                  nodes: [
                    {
                      id: '4.5',
                      text: '4.1.01.01.01 - Rawat Jalan Spesialis',
                      kode_rekening: '4.1.01.01.01',
                      uraian_rekening: 'Rawat Jalan Spesialis',
                      parent_id: '4.4',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.6',
                          text: '4.1.01.01.01.0001 - Gigi Dan Mulut',
                          kode_rekening: '4.1.01.01.01.0001',
                          uraian_rekening: 'Gigi Dan Mulut',
                          parent_id: '4.5',
                          selectable: true,
                        },
                        {
                          id: '4.7',
                          text: '4.1.01.01.01.0002 - Jantung',
                          kode_rekening: '4.1.01.01.01.0002',
                          uraian_rekening: 'Jantung',
                          parent_id: '4.5',
                          selectable: true,
                        },
                        {
                          id: '4.8',
                          text: '4.1.01.01.01.0003 - Mata',
                          kode_rekening: '4.1.01.01.01.0003',
                          uraian_rekening: 'Mata',
                          parent_id: '4.5',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.35',
                      text: '4.1.01.01.02 - Rawat Jalan Eksekutif',
                      kode_rekening: '4.1.01.01.02',
                      uraian_rekening: 'Rawat Jalan Eksekutif',
                      parent_id: '4.4',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.36',
                          text: '4.1.01.01.02.0001 - Gigi Dan Mulut Eksekutif',
                          kode_rekening: '4.1.01.01.02.0001',
                          uraian_rekening: 'Gigi Dan Mulut Eksekutif',
                          parent_id: '4.35',
                          selectable: true,
                        },
                        {
                          id: '4.37',
                          text: '4.1.01.01.02.0002 - Jantung Eksekutif',
                          kode_rekening: '4.1.01.01.02.0002',
                          uraian_rekening: 'Jantung Eksekutif',
                          parent_id: '4.35',
                          selectable: true,
                        },
                        {
                          id: '4.38',
                          text: '4.1.01.01.02.0003 - Mata Eksekutif',
                          kode_rekening: '4.1.01.01.02.0003',
                          uraian_rekening: 'Mata Eksekutif',
                          parent_id: '4.35',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.65',
                      text: '4.1.01.01.03 - Telemedicine',
                      kode_rekening: '4.1.01.01.03',
                      uraian_rekening: 'Telemedicine',
                      parent_id: '4.4',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.66',
                          text: '4.1.01.01.03.0001 - Jantung ',
                          kode_rekening: '4.1.01.01.03.0001',
                          uraian_rekening: 'Jantung ',
                          parent_id: '4.65',
                          selectable: true,
                        },
                        {
                          id: '4.67',
                          text: '4.1.01.01.03.0002 - Syaraf ',
                          kode_rekening: '4.1.01.01.03.0002',
                          uraian_rekening: 'Syaraf ',
                          parent_id: '4.65',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.73',
                      text: '4.1.01.01.04 - Pelayanan Kanker Terpadu',
                      kode_rekening: '4.1.01.01.04',
                      uraian_rekening: 'Pelayanan Kanker Terpadu',
                      parent_id: '4.4',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.74',
                          text: '4.1.01.01.04.0001 - Bedah Onkologi',
                          kode_rekening: '4.1.01.01.04.0001',
                          uraian_rekening: 'Bedah Onkologi',
                          parent_id: '4.73',
                          selectable: true,
                        },
                        {
                          id: '4.75',
                          text: '4.1.01.01.04.0002 - Hematologi Onkologi Medik',
                          kode_rekening: '4.1.01.01.04.0002',
                          uraian_rekening: 'Hematologi Onkologi Medik',
                          parent_id: '4.73',
                          selectable: true,
                        },
                        {
                          id: '4.76',
                          text: '4.1.01.01.04.0003 - Bedah Syaraf Onkologi',
                          kode_rekening: '4.1.01.01.04.0003',
                          uraian_rekening: 'Bedah Syaraf Onkologi',
                          parent_id: '4.73',
                          selectable: true,
                        },
                        {
                          id: '4.77',
                          text: '4.1.01.01.04.0004 - THT Onkologi',
                          kode_rekening: '4.1.01.01.04.0004',
                          uraian_rekening: 'THT Onkologi',
                          parent_id: '4.73',
                          selectable: true,
                        },
                        {
                          id: '4.78',
                          text: '4.1.01.01.04.0005 - Urologi Onkologi',
                          kode_rekening: '4.1.01.01.04.0005',
                          uraian_rekening: 'Urologi Onkologi',
                          parent_id: '4.73',
                          selectable: true,
                        },
                        {
                          id: '4.79',
                          text: '4.1.01.01.04.0006 - Ginekologi Onkologi',
                          kode_rekening: '4.1.01.01.04.0006',
                          uraian_rekening: 'Ginekologi Onkologi',
                          parent_id: '4.73',
                          selectable: true,
                        },
                        {
                          id: '4.80',
                          text: '4.1.01.01.04.0007 - Paliatif',
                          kode_rekening: '4.1.01.01.04.0007',
                          uraian_rekening: 'Paliatif',
                          parent_id: '4.73',
                          selectable: true,
                        },
                        {
                          id: '4.81',
                          text: '4.1.01.01.04.0008 - Radioterapi',
                          kode_rekening: '4.1.01.01.04.0008',
                          uraian_rekening: 'Radioterapi',
                          parent_id: '4.73',
                          selectable: true,
                        },
                        {
                          id: '4.82',
                          text: '4.1.01.01.04.0009 - Kemoterapi',
                          kode_rekening: '4.1.01.01.04.0009',
                          uraian_rekening: 'Kemoterapi',
                          parent_id: '4.73',
                          selectable: true,
                        },
                        {
                          id: '4.197',
                          text: '4.1.01.01.04.0010 - Radiasi Onkologi',
                          kode_rekening: '4.1.01.01.04.0010',
                          uraian_rekening: 'Radiasi Onkologi',
                          parent_id: '4.73',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.83',
                      text: '4.1.01.01.05 - Rawat Inap',
                      kode_rekening: '4.1.01.01.05',
                      uraian_rekening: 'Rawat Inap',
                      parent_id: '4.4',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.84',
                          text: '4.1.01.01.05.0001 - Layanan Rawat Inap',
                          kode_rekening: '4.1.01.01.05.0001',
                          uraian_rekening: 'Layanan Rawat Inap',
                          parent_id: '4.83',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.85',
                      text: '4.1.01.01.06 - Gawat Darurat',
                      kode_rekening: '4.1.01.01.06',
                      uraian_rekening: 'Gawat Darurat',
                      parent_id: '4.4',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.86',
                          text: '4.1.01.01.06.0001 - Layanan Gawat Darurat',
                          kode_rekening: '4.1.01.01.06.0001',
                          uraian_rekening: 'Layanan Gawat Darurat',
                          parent_id: '4.85',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.87',
                      text: '4.1.01.01.07 - Pelayanan Intensi Terpadu',
                      kode_rekening: '4.1.01.01.07',
                      uraian_rekening: 'Pelayanan Intensi Terpadu',
                      parent_id: '4.4',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.88',
                          text: '4.1.01.01.07.0001 - Intensive Care Unit (ICU)',
                          kode_rekening: '4.1.01.01.07.0001',
                          uraian_rekening: 'Intensive Care Unit (ICU)',
                          parent_id: '4.87',
                          selectable: true,
                        },
                        {
                          id: '4.89',
                          text: '4.1.01.01.07.0002 - Intensive Cardiac Care Unit (ICCU)',
                          kode_rekening: '4.1.01.01.07.0002',
                          uraian_rekening: 'Intensive Cardiac Care Unit (ICCU)',
                          parent_id: '4.87',
                          selectable: true,
                        },
                        {
                          id: '4.90',
                          text: '4.1.01.01.07.0003 - Pediatric Intensive Care Unit (PICU)',
                          kode_rekening: '4.1.01.01.07.0003',
                          uraian_rekening:
                            'Pediatric Intensive Care Unit (PICU)',
                          parent_id: '4.87',
                          selectable: true,
                        },
                        {
                          id: '4.91',
                          text: '4.1.01.01.07.0004 - Emergency Care Unit (ECU)',
                          kode_rekening: '4.1.01.01.07.0004',
                          uraian_rekening: 'Emergency Care Unit (ECU)',
                          parent_id: '4.87',
                          selectable: true,
                        },
                        {
                          id: '4.92',
                          text: '4.1.01.01.07.0005 - Neonatal Intensive Care Unit (NICU)',
                          kode_rekening: '4.1.01.01.07.0005',
                          uraian_rekening:
                            'Neonatal Intensive Care Unit (NICU)',
                          parent_id: '4.87',
                          selectable: true,
                        },
                        {
                          id: '4.202',
                          text: '4.1.01.01.07.0006 - High Care Unit (HCU)',
                          kode_rekening: '4.1.01.01.07.0006',
                          uraian_rekening: 'High Care Unit (HCU)',
                          parent_id: '4.87',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.93',
                      text: '4.1.01.01.08 - Perinatal Risiko Tinggi',
                      kode_rekening: '4.1.01.01.08',
                      uraian_rekening: 'Perinatal Risiko Tinggi',
                      parent_id: '4.4',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.94',
                          text: '4.1.01.01.08.0001 - Perinatal Risiko Tinggi Ibu',
                          kode_rekening: '4.1.01.01.08.0001',
                          uraian_rekening: 'Perinatal Risiko Tinggi Ibu',
                          parent_id: '4.93',
                          selectable: true,
                        },
                        {
                          id: '4.95',
                          text: '4.1.01.01.08.0002 - Persalinan',
                          kode_rekening: '4.1.01.01.08.0002',
                          uraian_rekening: 'Persalinan',
                          parent_id: '4.93',
                          selectable: true,
                        },
                        {
                          id: '4.96',
                          text: '4.1.01.01.08.0003 - Perinatal Risiko Tinggi Anak',
                          kode_rekening: '4.1.01.01.08.0003',
                          uraian_rekening: 'Perinatal Risiko Tinggi Anak',
                          parent_id: '4.93',
                          selectable: true,
                        },
                        {
                          id: '4.97',
                          text: '4.1.01.01.08.0005 - MNE (IBU)',
                          kode_rekening: '4.1.01.01.08.0005',
                          uraian_rekening: 'MNE (IBU)',
                          parent_id: '4.93',
                          selectable: true,
                        },
                        {
                          id: '4.98',
                          text: '4.1.01.01.08.0006 - MNE (BAYI)',
                          kode_rekening: '4.1.01.01.08.0006',
                          uraian_rekening: 'MNE (BAYI)',
                          parent_id: '4.93',
                          selectable: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: '4.99',
                  text: '4.1.01.02 - Penunjang Medis',
                  kode_rekening: '4.1.01.02',
                  uraian_rekening: 'Penunjang Medis',
                  parent_id: '4.3',
                  selectable: false,
                  nodes: [
                    {
                      id: '4.100',
                      text: '4.1.01.02.01 - Laboratorium',
                      kode_rekening: '4.1.01.02.01',
                      uraian_rekening: 'Laboratorium',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.101',
                          text: '4.1.01.02.01.0001 - Patologi Klinik',
                          kode_rekening: '4.1.01.02.01.0001',
                          uraian_rekening: 'Patologi Klinik',
                          parent_id: '4.100',
                          selectable: true,
                        },
                        {
                          id: '4.102',
                          text: '4.1.01.02.01.0002 - Patologi Anatomi',
                          kode_rekening: '4.1.01.02.01.0002',
                          uraian_rekening: 'Patologi Anatomi',
                          parent_id: '4.100',
                          selectable: true,
                        },
                        {
                          id: '4.103',
                          text: '4.1.01.02.01.0003 - Laboratorium Mikro',
                          kode_rekening: '4.1.01.02.01.0003',
                          uraian_rekening: 'Laboratorium Mikro',
                          parent_id: '4.100',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.104',
                      text: '4.1.01.02.02 - Radiologi',
                      kode_rekening: '4.1.01.02.02',
                      uraian_rekening: 'Radiologi',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.105',
                          text: '4.1.01.02.02.0001 - Radiologi',
                          kode_rekening: '4.1.01.02.02.0001',
                          uraian_rekening: 'Radiologi',
                          parent_id: '4.104',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.106',
                      text: '4.1.01.02.03 - Bedah Sentral',
                      kode_rekening: '4.1.01.02.03',
                      uraian_rekening: 'Bedah Sentral',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.107',
                          text: '4.1.01.02.03.0001 - Bedah Sentral',
                          kode_rekening: '4.1.01.02.03.0001',
                          uraian_rekening: 'Bedah Sentral',
                          parent_id: '4.106',
                          selectable: true,
                        },
                        {
                          id: '4.108',
                          text: '4.1.01.02.03.0002 - OK IGD',
                          kode_rekening: '4.1.01.02.03.0002',
                          uraian_rekening: 'OK IGD',
                          parent_id: '4.106',
                          selectable: true,
                        },
                        {
                          id: '4.109',
                          text: '4.1.01.02.03.0003 - OK GDH',
                          kode_rekening: '4.1.01.02.03.0003',
                          uraian_rekening: 'OK GDH',
                          parent_id: '4.106',
                          selectable: true,
                        },
                        {
                          id: '4.110',
                          text: '4.1.01.02.03.0004 - ROI IGD',
                          kode_rekening: '4.1.01.02.03.0004',
                          uraian_rekening: 'ROI IGD',
                          parent_id: '4.106',
                          selectable: true,
                        },
                        {
                          id: '4.111',
                          text: '4.1.01.02.03.0005 - ESWL',
                          kode_rekening: '4.1.01.02.03.0005',
                          uraian_rekening: 'ESWL',
                          parent_id: '4.106',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.112',
                      text: '4.1.01.02.04 - Endoskopi',
                      kode_rekening: '4.1.01.02.04',
                      uraian_rekening: 'Endoskopi',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.113',
                          text: '4.1.01.02.04.0001 - Endoskopi',
                          kode_rekening: '4.1.01.02.04.0001',
                          uraian_rekening: 'Endoskopi',
                          parent_id: '4.112',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.114',
                      text: '4.1.01.02.05 - Ambulan ',
                      kode_rekening: '4.1.01.02.05',
                      uraian_rekening: 'Ambulan ',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.115',
                          text: '4.1.01.02.05.0001 - Ambulan Rescue',
                          kode_rekening: '4.1.01.02.05.0001',
                          uraian_rekening: 'Ambulan Rescue',
                          parent_id: '4.114',
                          selectable: true,
                        },
                        {
                          id: '4.116',
                          text: '4.1.01.02.05.0002 - Ambulan Jenazah',
                          kode_rekening: '4.1.01.02.05.0002',
                          uraian_rekening: 'Ambulan Jenazah',
                          parent_id: '4.114',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.117',
                      text: '4.1.01.02.06 - Kedokteran Forensik Dan Medikolegal',
                      kode_rekening: '4.1.01.02.06',
                      uraian_rekening: 'Kedokteran Forensik Dan Medikolegal',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.118',
                          text: '4.1.01.02.06.0001 - Kedokteran Forensik Dan Medikolegal',
                          kode_rekening: '4.1.01.02.06.0001',
                          uraian_rekening:
                            'Kedokteran Forensik Dan Medikolegal',
                          parent_id: '4.117',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.119',
                      text: '4.1.01.02.07 - Transfusi Darah',
                      kode_rekening: '4.1.01.02.07',
                      uraian_rekening: 'Transfusi Darah',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.120',
                          text: '4.1.01.02.07.0001 - Transfusi Darah',
                          kode_rekening: '4.1.01.02.07.0001',
                          uraian_rekening: 'Transfusi Darah',
                          parent_id: '4.119',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.121',
                      text: '4.1.01.02.08 - Diagnostik Dan Intervensi Kardiovaskular',
                      kode_rekening: '4.1.01.02.08',
                      uraian_rekening:
                        'Diagnostik Dan Intervensi Kardiovaskular',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.122',
                          text: '4.1.01.02.08.0001 - Diagnostik Dan Intervensi Kardiovaskular',
                          kode_rekening: '4.1.01.02.08.0001',
                          uraian_rekening:
                            'Diagnostik Dan Intervensi Kardiovaskular',
                          parent_id: '4.121',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.123',
                      text: '4.1.01.02.09 - Farmasi',
                      kode_rekening: '4.1.01.02.09',
                      uraian_rekening: 'Farmasi',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.124',
                          text: '4.1.01.02.09.0001 - Farmasi',
                          kode_rekening: '4.1.01.02.09.0001',
                          uraian_rekening: 'Farmasi',
                          parent_id: '4.123',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.194',
                      text: '4.1.01.02.10 - Hemodialisis',
                      kode_rekening: '4.1.01.02.10',
                      uraian_rekening: 'Hemodialisis',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.195',
                          text: '4.1.01.02.10.0001 - Hemodialisis',
                          kode_rekening: '4.1.01.02.10.0001',
                          uraian_rekening: 'Hemodialisis',
                          parent_id: '4.194',
                          selectable: true,
                        },
                        {
                          id: '4.227',
                          text: '4.1.01.02.10.0002 - CAPD',
                          kode_rekening: '4.1.01.02.10.0002',
                          uraian_rekening: 'CAPD',
                          parent_id: '4.194',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.225',
                      text: '4.1.01.02.11 - Homecare',
                      kode_rekening: '4.1.01.02.11',
                      uraian_rekening: 'Homecare',
                      parent_id: '4.99',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.226',
                          text: '4.1.01.02.11.0001 - Homecare',
                          kode_rekening: '4.1.01.02.11.0001',
                          uraian_rekening: 'Homecare',
                          parent_id: '4.225',
                          selectable: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: '4.203',
                  text: '4.1.01.03 - BPJS Kesehatan',
                  kode_rekening: '4.1.01.03',
                  uraian_rekening: 'BPJS Kesehatan',
                  parent_id: '4.3',
                  selectable: false,
                  nodes: [
                    {
                      id: '4.204',
                      text: '4.1.01.03.01 - Rawat Jalan',
                      kode_rekening: '4.1.01.03.01',
                      uraian_rekening: 'Rawat Jalan',
                      parent_id: '4.203',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.205',
                          text: '4.1.01.03.01.0001 - Rawat Jalan',
                          kode_rekening: '4.1.01.03.01.0001',
                          uraian_rekening: 'Rawat Jalan',
                          parent_id: '4.204',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.206',
                      text: '4.1.01.03.02 - Rawat Inap',
                      kode_rekening: '4.1.01.03.02',
                      uraian_rekening: 'Rawat Inap',
                      parent_id: '4.203',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.207',
                          text: '4.1.01.03.02.0001 - Rawat Inap',
                          kode_rekening: '4.1.01.03.02.0001',
                          uraian_rekening: 'Rawat Inap',
                          parent_id: '4.206',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.208',
                      text: '4.1.01.03.03 - Gawat Darurat',
                      kode_rekening: '4.1.01.03.03',
                      uraian_rekening: 'Gawat Darurat',
                      parent_id: '4.203',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.209',
                          text: '4.1.01.03.03.0001 - Gawat Darurat',
                          kode_rekening: '4.1.01.03.03.0001',
                          uraian_rekening: 'Gawat Darurat',
                          parent_id: '4.208',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.210',
                      text: '4.1.01.03.04 - Penggantian Alat Kesehatan',
                      kode_rekening: '4.1.01.03.04',
                      uraian_rekening: 'Penggantian Alat Kesehatan',
                      parent_id: '4.203',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.211',
                          text: '4.1.01.03.04.0001 - Penggantian Alat Kesehatan',
                          kode_rekening: '4.1.01.03.04.0001',
                          uraian_rekening: 'Penggantian Alat Kesehatan',
                          parent_id: '4.210',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.212',
                      text: '4.1.01.03.05 - Penggantian Obat',
                      kode_rekening: '4.1.01.03.05',
                      uraian_rekening: 'Penggantian Obat',
                      parent_id: '4.203',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.213',
                          text: '4.1.01.03.05.0001 - Penggantian Obat Kronis',
                          kode_rekening: '4.1.01.03.05.0001',
                          uraian_rekening: 'Penggantian Obat Kronis',
                          parent_id: '4.212',
                          selectable: true,
                        },
                        {
                          id: '4.219',
                          text: '4.1.01.03.05.0002 - Penggantian Obat Kemoterapi',
                          kode_rekening: '4.1.01.03.05.0002',
                          uraian_rekening: 'Penggantian Obat Kemoterapi',
                          parent_id: '4.212',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.217',
                      text: '4.1.01.03.06 - Ambulan',
                      kode_rekening: '4.1.01.03.06',
                      uraian_rekening: 'Ambulan',
                      parent_id: '4.203',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.218',
                          text: '4.1.01.03.06.0001 - Ambulan',
                          kode_rekening: '4.1.01.03.06.0001',
                          uraian_rekening: 'Ambulan',
                          parent_id: '4.217',
                          selectable: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: '4.214',
                  text: '4.1.01.04 - Klaim Pelayanan Penjamin Non BPJS',
                  kode_rekening: '4.1.01.04',
                  uraian_rekening: 'Klaim Pelayanan Penjamin Non BPJS',
                  parent_id: '4.3',
                  selectable: false,
                  nodes: [
                    {
                      id: '4.215',
                      text: '4.1.01.04.01 - Klaim Pelayanan Penjamin Non BPJS',
                      kode_rekening: '4.1.01.04.01',
                      uraian_rekening: 'Klaim Pelayanan Penjamin Non BPJS',
                      parent_id: '4.214',
                      selectable: true,
                    },
                    {
                      id: '4.216',
                      text: '4.1.01.04.01.01 - Klaim Pelayanan Penjamin Non BPJS',
                      kode_rekening: '4.1.01.04.01.01',
                      uraian_rekening: 'Klaim Pelayanan Penjamin Non BPJS',
                      parent_id: '4.214',
                      selectable: true,
                    },
                  ],
                },
              ],
            },
            {
              id: '4.125',
              text: '4.1.02 - Jasa Layanan Pendidikan',
              kode_rekening: '4.1.02',
              uraian_rekening: 'Jasa Layanan Pendidikan',
              parent_id: '4.2',
              selectable: false,
              nodes: [
                {
                  id: '4.126',
                  text: '4.1.02.01 - Pelayanan Pendidikan',
                  kode_rekening: '4.1.02.01',
                  uraian_rekening: 'Pelayanan Pendidikan',
                  parent_id: '4.125',
                  selectable: false,
                  nodes: [
                    {
                      id: '4.127',
                      text: '4.1.02.01.01 - Pendidikan dan Pelatihan Medik',
                      kode_rekening: '4.1.02.01.01',
                      uraian_rekening: 'Pendidikan dan Pelatihan Medik',
                      parent_id: '4.126',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.128',
                          text: '4.1.02.01.01.0001 - Pendidikan dan Pelatihan Medik',
                          kode_rekening: '4.1.02.01.01.0001',
                          uraian_rekening: 'Pendidikan dan Pelatihan Medik',
                          parent_id: '4.127',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.129',
                      text: '4.1.02.01.02 - Penelitian dan Pengembangan',
                      kode_rekening: '4.1.02.01.02',
                      uraian_rekening: 'Penelitian dan Pengembangan',
                      parent_id: '4.126',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.130',
                          text: '4.1.02.01.02.0001 - Penelitian dan Pengembangan',
                          kode_rekening: '4.1.02.01.02.0001',
                          uraian_rekening: 'Penelitian dan Pengembangan',
                          parent_id: '4.129',
                          selectable: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: '4.131',
          text: '4.2 - Hibah',
          kode_rekening: '4.2',
          uraian_rekening: 'Hibah',
          parent_id: '4.1',
          selectable: false,
          nodes: [
            {
              id: '4.132',
              text: '4.2.01 - Hibah',
              kode_rekening: '4.2.01',
              uraian_rekening: 'Hibah',
              parent_id: '4.131',
              selectable: false,
              nodes: [
                {
                  id: '4.133',
                  text: '4.2.01.01 - Hibah',
                  kode_rekening: '4.2.01.01',
                  uraian_rekening: 'Hibah',
                  parent_id: '4.132',
                  selectable: false,
                  nodes: [
                    {
                      id: '4.134',
                      text: '4.2.01.01.01 - Hibah Terikat',
                      kode_rekening: '4.2.01.01.01',
                      uraian_rekening: 'Hibah Terikat',
                      parent_id: '4.133',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.135',
                          text: '4.2.01.01.01.0001 - Hibah Terikat',
                          kode_rekening: '4.2.01.01.01.0001',
                          uraian_rekening: 'Hibah Terikat',
                          parent_id: '4.134',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.136',
                      text: '4.2.01.01.02 - Hibah Tidak Terikat',
                      kode_rekening: '4.2.01.01.02',
                      uraian_rekening: 'Hibah Tidak Terikat',
                      parent_id: '4.133',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.137',
                          text: '4.2.01.01.02.0001 - Hibah Tidak Terikat',
                          kode_rekening: '4.2.01.01.02.0001',
                          uraian_rekening: 'Hibah Tidak Terikat',
                          parent_id: '4.136',
                          selectable: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: '4.138',
          text: '4.3 - Hasil Kerjasama',
          kode_rekening: '4.3',
          uraian_rekening: 'Hasil Kerjasama',
          parent_id: '4.1',
          selectable: false,
          nodes: [
            {
              id: '4.139',
              text: '4.3.01 - Hasil Kerjasama',
              kode_rekening: '4.3.01',
              uraian_rekening: 'Hasil Kerjasama',
              parent_id: '4.138',
              selectable: false,
              nodes: [
                {
                  id: '4.140',
                  text: '4.3.01.01 - Hasil Kerjasama',
                  kode_rekening: '4.3.01.01',
                  uraian_rekening: 'Hasil Kerjasama',
                  parent_id: '4.139',
                  selectable: false,
                  nodes: [
                    {
                      id: '4.141',
                      text: '4.3.01.01.01 - Sewa Lahan',
                      kode_rekening: '4.3.01.01.01',
                      uraian_rekening: 'Sewa Lahan',
                      parent_id: '4.140',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.142',
                          text: '4.3.01.01.01.0001 - Tenant',
                          kode_rekening: '4.3.01.01.01.0001',
                          uraian_rekening: 'Tenant',
                          parent_id: '4.141',
                          selectable: true,
                        },
                        {
                          id: '4.143',
                          text: '4.3.01.01.01.0002 - ATM',
                          kode_rekening: '4.3.01.01.01.0002',
                          uraian_rekening: 'ATM',
                          parent_id: '4.141',
                          selectable: true,
                        },
                        {
                          id: '4.144',
                          text: '4.3.01.01.01.0003 - Open Table',
                          kode_rekening: '4.3.01.01.01.0003',
                          uraian_rekening: 'Open Table',
                          parent_id: '4.141',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.145',
                      text: '4.3.01.01.02 - IPM',
                      kode_rekening: '4.3.01.01.02',
                      uraian_rekening: 'IPM',
                      parent_id: '4.140',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.146',
                          text: '4.3.01.01.02.0001 - Kontribusi Fee',
                          kode_rekening: '4.3.01.01.02.0001',
                          uraian_rekening: 'Kontribusi Fee',
                          parent_id: '4.145',
                          selectable: true,
                        },
                        {
                          id: '4.147',
                          text: '4.3.01.01.02.0002 - Sewa Ruang',
                          kode_rekening: '4.3.01.01.02.0002',
                          uraian_rekening: 'Sewa Ruang',
                          parent_id: '4.145',
                          selectable: true,
                        },
                        {
                          id: '4.148',
                          text: '4.3.01.01.02.0003 - Sewa Alat',
                          kode_rekening: '4.3.01.01.02.0003',
                          uraian_rekening: 'Sewa Alat',
                          parent_id: '4.145',
                          selectable: true,
                        },
                        {
                          id: '4.230',
                          text: '4.3.01.01.02.0004 - Pelatihan',
                          kode_rekening: '4.3.01.01.02.0004',
                          uraian_rekening: 'Pelatihan',
                          parent_id: '4.145',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.149',
                      text: '4.3.01.01.03 - Parkir',
                      kode_rekening: '4.3.01.01.03',
                      uraian_rekening: 'Parkir',
                      parent_id: '4.140',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.150',
                          text: '4.3.01.01.03.0001 - Parkir',
                          kode_rekening: '4.3.01.01.03.0001',
                          uraian_rekening: 'Parkir',
                          parent_id: '4.149',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.151',
                      text: '4.3.01.01.04 - Sterilisasi ',
                      kode_rekening: '4.3.01.01.04',
                      uraian_rekening: 'Sterilisasi ',
                      parent_id: '4.140',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.152',
                          text: '4.3.01.01.04.0001 - Sterilisasi',
                          kode_rekening: '4.3.01.01.04.0001',
                          uraian_rekening: 'Sterilisasi',
                          parent_id: '4.151',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.153',
                      text: '4.3.01.01.05 - Sewa Ruangan',
                      kode_rekening: '4.3.01.01.05',
                      uraian_rekening: 'Sewa Ruangan',
                      parent_id: '4.140',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.154',
                          text: '4.3.01.01.05.0001 - Sewa Ruangan',
                          kode_rekening: '4.3.01.01.05.0001',
                          uraian_rekening: 'Sewa Ruangan',
                          parent_id: '4.153',
                          selectable: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: '4.155',
          text: '4.4 - APBN/APBD',
          kode_rekening: '4.4',
          uraian_rekening: 'APBN/APBD',
          parent_id: '4.1',
          selectable: false,
          nodes: [
            {
              id: '4.156',
              text: '4.4.01 - APBN/APBD',
              kode_rekening: '4.4.01',
              uraian_rekening: 'APBN/APBD',
              parent_id: '4.155',
              selectable: false,
              nodes: [
                {
                  id: '4.157',
                  text: '4.4.01.01 - APBN/APBD',
                  kode_rekening: '4.4.01.01',
                  uraian_rekening: 'APBN/APBD',
                  parent_id: '4.156',
                  selectable: false,
                  nodes: [
                    {
                      id: '4.158',
                      text: '4.4.01.01.01 - APBN',
                      kode_rekening: '4.4.01.01.01',
                      uraian_rekening: 'APBN',
                      parent_id: '4.157',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.159',
                          text: '4.4.01.01.01.0001 - DPA APBN',
                          kode_rekening: '4.4.01.01.01.0001',
                          uraian_rekening: 'DPA APBN',
                          parent_id: '4.158',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.160',
                      text: '4.4.01.01.02 - APBD',
                      kode_rekening: '4.4.01.01.02',
                      uraian_rekening: 'APBD',
                      parent_id: '4.157',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.161',
                          text: '4.4.01.01.02.0001 - DPA APBD',
                          kode_rekening: '4.4.01.01.02.0001',
                          uraian_rekening: 'DPA APBD',
                          parent_id: '4.160',
                          selectable: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: '4.162',
          text: '4.5 - Lain-Lain Pendapatan BLUD',
          kode_rekening: '4.5',
          uraian_rekening: 'Lain-Lain Pendapatan BLUD',
          parent_id: '4.1',
          selectable: false,
          nodes: [
            {
              id: '4.163',
              text: '4.5.01 - Lain-Lain Pendapatan BLUD',
              kode_rekening: '4.5.01',
              uraian_rekening: 'Lain-Lain Pendapatan BLUD',
              parent_id: '4.162',
              selectable: false,
              nodes: [
                {
                  id: '4.164',
                  text: '4.5.01.01 - Lain-Lain Pendapatan BLUD',
                  kode_rekening: '4.5.01.01',
                  uraian_rekening: 'Lain-Lain Pendapatan BLUD',
                  parent_id: '4.163',
                  selectable: false,
                  nodes: [
                    {
                      id: '4.165',
                      text: '4.5.01.01.01 - Jasa Giro',
                      kode_rekening: '4.5.01.01.01',
                      uraian_rekening: 'Jasa Giro',
                      parent_id: '4.164',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.166',
                          text: '4.5.01.01.01.0001 - Jasa Giro Bank Jatim',
                          kode_rekening: '4.5.01.01.01.0001',
                          uraian_rekening: 'Jasa Giro Bank Jatim',
                          parent_id: '4.165',
                          selectable: true,
                        },
                        {
                          id: '4.167',
                          text: '4.5.01.01.01.0002 - Jasa Giro BNI',
                          kode_rekening: '4.5.01.01.01.0002',
                          uraian_rekening: 'Jasa Giro BNI',
                          parent_id: '4.165',
                          selectable: true,
                        },
                        {
                          id: '4.168',
                          text: '4.5.01.01.01.0003 - Jasa Giro Bank Mandiri',
                          kode_rekening: '4.5.01.01.01.0003',
                          uraian_rekening: 'Jasa Giro Bank Mandiri',
                          parent_id: '4.165',
                          selectable: true,
                        },
                        {
                          id: '4.169',
                          text: '4.5.01.01.01.0004 - Jasa Giro BTN',
                          kode_rekening: '4.5.01.01.01.0004',
                          uraian_rekening: 'Jasa Giro BTN',
                          parent_id: '4.165',
                          selectable: true,
                        },
                        {
                          id: '4.170',
                          text: '4.5.01.01.01.0005 - Jasa Giro BRI',
                          kode_rekening: '4.5.01.01.01.0005',
                          uraian_rekening: 'Jasa Giro BRI',
                          parent_id: '4.165',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.171',
                      text: '4.5.01.01.02 - Pendapatan Bunga ',
                      kode_rekening: '4.5.01.01.02',
                      uraian_rekening: 'Pendapatan Bunga ',
                      parent_id: '4.164',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.172',
                          text: '4.5.01.01.02.0001 - Deposito Bank Jatim',
                          kode_rekening: '4.5.01.01.02.0001',
                          uraian_rekening: 'Deposito Bank Jatim',
                          parent_id: '4.171',
                          selectable: true,
                        },
                        {
                          id: '4.173',
                          text: '4.5.01.01.02.0002 - Deposito BNI',
                          kode_rekening: '4.5.01.01.02.0002',
                          uraian_rekening: 'Deposito BNI',
                          parent_id: '4.171',
                          selectable: true,
                        },
                        {
                          id: '4.174',
                          text: '4.5.01.01.02.0003 - Deposito Bank Mandiri',
                          kode_rekening: '4.5.01.01.02.0003',
                          uraian_rekening: 'Deposito Bank Mandiri',
                          parent_id: '4.171',
                          selectable: true,
                        },
                        {
                          id: '4.175',
                          text: '4.5.01.01.02.0004 - Deposito BTN',
                          kode_rekening: '4.5.01.01.02.0004',
                          uraian_rekening: 'Deposito BTN',
                          parent_id: '4.171',
                          selectable: true,
                        },
                        {
                          id: '4.176',
                          text: '4.5.01.01.02.0005 - Deposito BRI',
                          kode_rekening: '4.5.01.01.02.0005',
                          uraian_rekening: 'Deposito BRI',
                          parent_id: '4.171',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.177',
                      text: '4.5.01.01.03 - Keuntungan Selisih Nilai Tukar Rupiah Terhadap Mata Uang Asing',
                      kode_rekening: '4.5.01.01.03',
                      uraian_rekening:
                        'Keuntungan Selisih Nilai Tukar Rupiah Terhadap Mata Uang Asing',
                      parent_id: '4.164',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.178',
                          text: '4.5.01.01.03.0001 - Keuntungan Selisih Nilai Tukar Rupiah Terhadap Mata Uang Asing',
                          kode_rekening: '4.5.01.01.03.0001',
                          uraian_rekening:
                            'Keuntungan Selisih Nilai Tukar Rupiah Terhadap Mata Uang Asing',
                          parent_id: '4.177',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.179',
                      text: '4.5.01.01.04 - Komisi,Potongan Ataupun Bentuk Lain Sebagai Akibat Dari Penjualan Dan / Atau Pengadaan Barang Dan / Atau Jasa Oleh BLUD',
                      kode_rekening: '4.5.01.01.04',
                      uraian_rekening:
                        'Komisi,Potongan Ataupun Bentuk Lain Sebagai Akibat Dari Penjualan Dan / Atau Pengadaan Barang Dan / Atau Jasa Oleh BLUD',
                      parent_id: '4.164',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.180',
                          text: '4.5.01.01.04.0001 - Denda Pengadaan',
                          kode_rekening: '4.5.01.01.04.0001',
                          uraian_rekening: 'Denda Pengadaan',
                          parent_id: '4.179',
                          selectable: true,
                        },
                        {
                          id: '4.181',
                          text: '4.5.01.01.04.0002 - Denda BPJS Kesehatan',
                          kode_rekening: '4.5.01.01.04.0002',
                          uraian_rekening: 'Denda BPJS Kesehatan',
                          parent_id: '4.179',
                          selectable: true,
                        },
                        {
                          id: '4.182',
                          text: '4.5.01.01.04.0003 - Denda Parkir',
                          kode_rekening: '4.5.01.01.04.0003',
                          uraian_rekening: 'Denda Parkir',
                          parent_id: '4.179',
                          selectable: true,
                        },
                        {
                          id: '4.183',
                          text: '4.5.01.01.04.0004 - Retur Obat',
                          kode_rekening: '4.5.01.01.04.0004',
                          uraian_rekening: 'Retur Obat',
                          parent_id: '4.179',
                          selectable: true,
                        },
                        {
                          id: '4.184',
                          text: '4.5.01.01.04.0005 - Selisih Verifikasi',
                          kode_rekening: '4.5.01.01.04.0005',
                          uraian_rekening: 'Selisih Verifikasi',
                          parent_id: '4.179',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.185',
                      text: '4.5.01.01.05 - Investasi',
                      kode_rekening: '4.5.01.01.05',
                      uraian_rekening: 'Investasi',
                      parent_id: '4.164',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.186',
                          text: '4.5.01.01.05.0001 - Investasi',
                          kode_rekening: '4.5.01.01.05.0001',
                          uraian_rekening: 'Investasi',
                          parent_id: '4.185',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.187',
                      text: '4.5.01.01.06 - Pengembangan Usaha',
                      kode_rekening: '4.5.01.01.06',
                      uraian_rekening: 'Pengembangan Usaha',
                      parent_id: '4.164',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.188',
                          text: '4.5.01.01.06.0001 - Catering Gizi',
                          kode_rekening: '4.5.01.01.06.0001',
                          uraian_rekening: 'Catering Gizi',
                          parent_id: '4.187',
                          selectable: true,
                        },
                        {
                          id: '4.189',
                          text: '4.5.01.01.06.0002 - Sewa Rumah Duka',
                          kode_rekening: '4.5.01.01.06.0002',
                          uraian_rekening: 'Sewa Rumah Duka',
                          parent_id: '4.187',
                          selectable: true,
                        },
                        {
                          id: '4.190',
                          text: '4.5.01.01.06.0003 - Hostel',
                          kode_rekening: '4.5.01.01.06.0003',
                          uraian_rekening: 'Hostel',
                          parent_id: '4.187',
                          selectable: true,
                        },
                      ],
                    },
                    {
                      id: '4.191',
                      text: '4.5.01.01.07 - Lain-Lain Pendapatan',
                      kode_rekening: '4.5.01.01.07',
                      uraian_rekening: 'Lain-Lain Pendapatan',
                      parent_id: '4.164',
                      selectable: false,
                      nodes: [
                        {
                          id: '4.192',
                          text: '4.5.01.01.07.0001 - Study banding',
                          kode_rekening: '4.5.01.01.07.0001',
                          uraian_rekening: 'Study banding',
                          parent_id: '4.191',
                          selectable: true,
                        },
                        {
                          id: '4.193',
                          text: '4.5.01.01.07.0002 - Lain-Lain Pendapatan',
                          kode_rekening: '4.5.01.01.07.0002',
                          uraian_rekening: 'Lain-Lain Pendapatan',
                          parent_id: '4.191',
                          selectable: true,
                        },
                        {
                          id: '4.201',
                          text: '4.5.01.01.07.0003 - Titipan',
                          kode_rekening: '4.5.01.01.07.0003',
                          uraian_rekening: 'Titipan',
                          parent_id: '4.191',
                          selectable: true,
                        },
                        {
                          id: '4.220',
                          text: '4.5.01.01.07.0004 - Sewa Ambulan',
                          kode_rekening: '4.5.01.01.07.0004',
                          uraian_rekening: 'Sewa Ambulan',
                          parent_id: '4.191',
                          selectable: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const handleKodeRekeningSearch = () => {
    setKodeRekeningSearchValue(kodeRekeningSearchQuery);
  };

  const handleKodeRekeningChoose = () => {
    handleModalClose();
    switch (activeInput) {
      case 'debit':
        setDebit(kodeRekeningSelectedNode?.text);
        break;
      case 'kredit':
        setKredit(kodeRekeningSelectedNode?.text);
        break;
      default:
        break;
    }
  };

  const handleKodeRekeningNodeSelect = (node: TreeNode) => {
    setKodeRekeningSelectedNode(node);
  };

  const handleInputFocus = (inputName: 'debit' | 'kredit') => {
    setActiveInput(inputName);
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
    setKodeRekeningSearchValue('');
    setKodeRekeningSearchQuery('');
  };

  return (
    <>
      <TwHeader title="Tambah Penyesuaian" />
      <form className="mt-4 rounded-lg bg-white p-4 shadow">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwInput
                name="jenis"
                label="Jenis Penyesuaian"
                type="text"
                required
                placeholder="Masukkan Jenis Penyesuaian"
              />

              <TwInput
                name="rekeningDebit"
                value={debit}
                label="Rekening Debit"
                type="text"
                readOnly
                placeholder="Kode Rekening Debit"
              />

              <div className="flex w-full items-end justify-between space-x-2">
                <div className="w-full">
                  <TwInput
                    value={debit}
                    name="debit"
                    label="Debit"
                    type="text"
                    readOnly
                    placeholder="Kode SAP 13 level 5"
                  />
                </div>
                <div>
                  <TwButton
                    icon={<FolderPlusIcon className="h-5 w-5" />}
                    type="button"
                    size="md"
                    title="Pilih"
                    onClick={() => handleInputFocus('debit')}
                  />
                </div>
              </div>

              <TwInput
                name="rekeningKredit"
                label="Rekening Kredit"
                value={kredit}
                type="text"
                readOnly
                placeholder="Kode Rekening Kredit"
              />

              <div className="flex w-full items-end justify-between space-x-2">
                <div className="w-full">
                  <TwInput
                    name="kredit"
                    value={kredit}
                    label="Kredit"
                    type="text"
                    readOnly
                    placeholder="Kode SAP 13 level 5"
                  />
                </div>
                <div>
                  <TwButton
                    icon={<FolderPlusIcon className="h-5 w-5" />}
                    type="button"
                    size="md"
                    title="Pilih"
                    onClick={() => handleInputFocus('kredit')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/master/penyesuaian">
            <TwButton
              type="button"
              title="Cancel"
              variant="secondary"
              icon={
                <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
              }
            />
          </Link>
          <Link href="/master/penyesuaian">
            <TwButton
              type="submit"
              title="Save"
              variant="success"
              icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
            />
          </Link>
        </div>
      </form>
      <Transition show={modalIsOpen}>
        <Dialog className="relative z-10" onClose={() => {}}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
              <TransitionChild
                enter="ease-out duration-100"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative w-1/2 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all">
                  <div>
                    <div className="mt-3 text-center">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Pilih Kode Rekening
                      </DialogTitle>
                      <div className="space-y-2">
                        <div className="flex w-full items-end justify-between space-x-2">
                          <div className="w-full">
                            <TwInput
                              name="searchModal"
                              type="text"
                              placeholder="Cari Kode SAP 13 level 5"
                              value={kodeRekeningSearchQuery}
                              onChange={(e) =>
                                setKodeRekeningSearchQuery(e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <TwButton
                              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                              type="button"
                              size="md"
                              title="Cari"
                              onClick={handleKodeRekeningSearch}
                            />
                          </div>
                        </div>
                        <TwTreeView
                          treeData={treeData}
                          searchValue={searchKodeRekeningValue}
                          onNodeSelect={handleKodeRekeningNodeSelect}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end space-x-2">
                    <TwButton
                      title="Pilih"
                      variant="success"
                      icon={<CheckIcon className="h-5 w-5" />}
                      onClick={handleKodeRekeningChoose}
                    />
                    <TwButton
                      title="Batal"
                      variant="secondary"
                      icon={<ArrowUturnLeftIcon className="h-5 w-5" />}
                      onClick={handleModalClose}
                    />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
