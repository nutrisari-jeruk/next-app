'use client';

import React from 'react';
import {
  CalendarIcon,
  CommandLineIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';
import ListSection, { ListItem } from '@/components/list-section';

const items: ListItem[] = [
  {
    name: 'Contoh 1',
    description: 'Contoh 1',
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
  {
    name: 'Contoh 3',
    description: 'Contoh 3',
    href: '/Contoh-3',
    iconColor: 'bg-yellow-500',
    icon: CalendarIcon,
  },
];

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mx-auto mt-10 max-w-lg">
        <h2 className="text-center text-base font-semibold leading-6 text-gray-900">
          by Afan
        </h2>
        <p className="mt-1 text-sm text-gray-500">N.B.: Kontribusi AFAN</p>
        <ListSection items={items} />
      </div>
    </main>
  );
};

export default Home;
