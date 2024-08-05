'use client';

import React from 'react';
import {
  CalendarIcon,
  CommandLineIcon,
  MegaphoneIcon,
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import ListSection, { ListItem } from '@/components/list-section';
import FAQAccordion, { FAQItem } from '@/components/faq-accordion';
import Footer, { FooterLink } from '@/components/footer-simple-centered';
import StatsWithIconCards from '@/components/stats-with-icon-cards';

interface StatItem {
  id: number;
  name: string;
  stat: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const items: ListItem[] = [
  {
    name: 'Contoh 1',
    description: 'Lorem Ipsum',
    href: '/Contoh-1',
    iconColor: 'bg-pink-500',
    icon: MegaphoneIcon,
  },
  {
    name: 'Contoh 2',
    description: 'Contoh 2',
    href: '/Contoh-2',
    iconColor: 'bg-purple-500',
    icon: CommandLineIcon,
  },
];

const faqs: FAQItem[] = [
  {
    question: 'Pertanyaan ?',
    answer: 'Jawaban.',
  },
];

const navigation = {
  main: [
    { name: 'Link', href: '#' },
    { name: 'Link', href: '#' },
    { name: 'Link', href: '#' },
  ],
  social: [
    {
      name: 'Socmed / Icon Link',
      href: '#',
      icon: CalendarIcon,
    },
    {
      name: 'Socmed / Icon Link',
      href: '#',
      icon: CommandLineIcon,
    },
  ],
};

const stats: StatItem[] = [
  { id: 1, name: 'Total Statistik Card 1', stat: '71', icon: UsersIcon },
  { id: 2, name: 'Total Statistik Card 2', stat: '58', icon: EnvelopeOpenIcon },
  {
    id: 3,
    name: 'Total Statistik Card 3',
    stat: '24',
    icon: CursorArrowRaysIcon,
  },
];

const Home: React.FC = () => {
  const otherDept = 'Instalasi Penjaminan';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-center text-base font-semibold leading-6 text-gray-900">
        by Afan
      </h2>
      <p className="mt-1 text-sm text-gray-500">N.B.: Kontribusi AFAN</p>
      <StatsWithIconCards stats={stats} />
      {/* <ListSection items={items} /> */}
      {/* <FAQAccordion faqs={faqs} /> */}
      {/* <Footer navigation={navigation} otherDept={otherDept} /> */}
    </main>
  );
};

export default Home;
