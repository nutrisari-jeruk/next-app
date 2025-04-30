'use client';

import { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { TreeNode } from '@/types/tree-view';
import { Button } from '@headlessui/react';

interface Props {
  treeData: TreeNode[];
  searchValue?: string;
  className?: string;
  onNodeSelect?: (node: TreeNode) => void;
}

export default function TwTreeViewReverse(props: Props) {
  const {
    treeData = [],
    searchValue = '',
    className = '',
    onNodeSelect = () => {},
  } = props;
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleSearchClick = () => {
      if (searchValue) {
        const expanded = new Set<number>();

        const searchNodes = (nodes: TreeNode[], allNodes: TreeNode[]) => {
          for (const node of nodes) {
            if (node.text.toLowerCase().includes(searchValue.toLowerCase())) {
              expanded.add(node.id);
              let parent_id = node.parent_id;
              while (parent_id) {
                expanded.add(parent_id);
                const parentNode = allNodes.find((n) => n.id === parent_id);
                if (parentNode) {
                  parent_id = parentNode.parent_id;
                } else {
                  break;
                }
              }
            }
            if (node.nodes) searchNodes(node.nodes, allNodes);
          }
        };

        const flattenNodes = (nodes: TreeNode[]): TreeNode[] => {
          return nodes.reduce<TreeNode[]>((acc, node) => {
            acc.push(node);
            if (node.nodes) acc.push(...flattenNodes(node.nodes));
            return acc;
          }, []);
        };

        const allNodes = flattenNodes(treeData);
        searchNodes(treeData, allNodes);
        setExpandedNodes(expanded);
      } else {
        setExpandedNodes(new Set());
      }
    };

    handleSearchClick();
  }, [searchValue, treeData]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="rounded-sm bg-indigo-500 px-1 text-white">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const handleNodeClick = (node: TreeNode) => {
    return () => {
      const hasChildren = node.nodes && node.nodes.length > 0;

      if (hasChildren) {
        setExpandedNodes((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(node.id)) {
            newSet.delete(node.id);
          } else {
            newSet.add(node.id);
          }
          return newSet;
        });
      } else if (node.is_selectable) {
        onNodeSelect(node);
      }
    };
  };

  const resolveNodeText = (text: string) => {
    const textSplitted = text.split(' - ');
    return (
      <div className="flex space-x-2">
        <span>{highlightText(textSplitted[0], searchValue)}</span>
        <span>-</span>
        <span>{highlightText(textSplitted[1], searchValue)}</span>
      </div>
    );
  };

  const renderTreeNodes = (nodes: TreeNode[]): JSX.Element[] => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes.has(node.id);
      const hasChildren = node.nodes && node.nodes.length > 0;

      return (
        <div key={node.id}>
          <div className="mb-1 flex items-center rounded-sm border px-2 py-1 shadow-sm">
            {hasChildren && (
              <button className="hover:scale-125" onClick={handleNodeClick(node)}>
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                )}
              </button>
            )}
            <Button
              onClick={() => {node.is_selectable ? onNodeSelect(node) : false} }
              className={clsx(
                'flex flex-grow items-center',
                className,
              )}
            >
              <span
                className={clsx(
                  'ml-2 text-left font-mono text-sm text-gray-500',
                  node.is_selectable && 'font-bold text-gray-600 underline',
                )}
              >
                {resolveNodeText(node.text)}
              </span>
            </Button>
          </div>

          {hasChildren && isExpanded && (
            <div className="ml-4 border-l border-l-gray-200 pl-4">
              {renderTreeNodes(node.nodes!)}
            </div>
          )}
        </div>
      );
    });
  };

  return <div>{renderTreeNodes(treeData)}</div>;
}
