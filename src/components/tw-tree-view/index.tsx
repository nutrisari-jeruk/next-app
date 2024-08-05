import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import TwInput from '../tw-input';

interface TreeNode {
  id: string;
  text: string;
  parent_id: string;
  selectable: boolean;
  nodes?: TreeNode[];
}

interface TwTreeViewProps {
  treeData: TreeNode[];
  className?: string;
}

export default function TwTreeView(props: TwTreeViewProps) {
  const { treeData, className } = props;
  const renderTreeNodes = (nodes: TreeNode[]): JSX.Element[] => {
    return nodes.map((node) => (
      <Disclosure key={node.id}>
        {({ open }) => (
          <>
            <DisclosureButton
              className={clsx(
                'flex w-full items-center space-x-3 rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100',
                className,
                'mb-2',
              )}
            >
              {node.nodes && (
                <span>
                  {open ? (
                    <ChevronDownIcon className="h-6 w-6 text-gray-700" />
                  ) : (
                    <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                  )}
                </span>
              )}
              <span className="ml-2 font-medium text-gray-800">
                {node.text}
              </span>
            </DisclosureButton>
            {node.nodes && (
              <DisclosurePanel className="ml-4 mt-4 border-l border-gray-200 pl-4">
                {renderTreeNodes(node.nodes)}
              </DisclosurePanel>
            )}
          </>
        )}
      </Disclosure>
    ));
  };

  return <div>{renderTreeNodes(treeData)}</div>;
}
