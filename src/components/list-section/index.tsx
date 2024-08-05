import { ChevronRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

export interface ListItem {
  name: string;
  description: string;
  href: string;
  iconColor: string;
  icon: React.ElementType;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ListSectionProps {
  items: ListItem[];
}

const ListSection: React.FC<ListSectionProps> = ({ items }) => {
  return (
    <ul
      role="list"
      className="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200"
    >
      {items.map((item, itemIdx) => (
        <li key={itemIdx}>
          <div className="group relative flex items-start space-x-3 py-4">
            <div className="flex-shrink-0">
              <span
                className={classNames(
                  item.iconColor,
                  'inline-flex h-10 w-10 items-center justify-center rounded-lg',
                )}
              >
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900">
                <a href={item.href}>
                  <span className="absolute inset-0" aria-hidden="true" />
                  {item.name}
                </a>
              </div>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <div className="flex-shrink-0 self-center">
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListSection;
