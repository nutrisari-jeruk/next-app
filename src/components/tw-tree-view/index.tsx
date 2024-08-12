'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { TreeNode } from '@/types/tree-view';
import { Button } from '@headlessui/react';

interface TwTreeView {
  treeData: TreeNode[];
  searchValue?: string;
  className?: string;
  onNodeSelect?: (node: TreeNode) => void;
}

export default function TwTreeView(props: TwTreeView) {
  const {
    treeData = [],
    searchValue = '',
    className = '',
    onNodeSelect = () => {},
  } = props;
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  useEffect(() => {
    handleSearchClick();
  }, [searchValue]);

  const handleSearchClick = () => {
    if (searchValue) {
      const expanded = new Set<number>();

        const searchNodes = (nodes: TreeNode[], allNodes: TreeNode[]) => {
          for (const node of nodes) {
            if (node.text.toLowerCase().includes(searchValue.toLowerCase())) {
              expanded.add(node.id);

              // Expand all parent nodes
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

            // Recursively search child nodes
            if (node.nodes) {
              searchNodes(node.nodes, allNodes);
            }
          }
        };

        // Flatten the tree structure to get a list of all nodes
        const flattenNodes = (nodes: TreeNode[]): TreeNode[] => {
          return nodes.reduce<TreeNode[]>((acc, node) => {
            acc.push(node);
            if (node.nodes) {
              acc.push(...flattenNodes(node.nodes));
            }
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

  // Handle click to expand or collapse node
  const handleNodeClick = (node: TreeNode) => {
    return () => {
      if (node.is_selectable) {
        setSelectedNodeId(node.id); // Set ID node yang terpilih
        onNodeSelect(node); // Panggil handler yang di-passing dari props
      } else {
        setExpandedNodes((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(node.id)) {
            newSet.delete(node.id);
          } else {
            newSet.add(node.id);
          }
          return newSet;
        });
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

      return (
        <div key={node.id}>
          <Button
            onClick={handleNodeClick(node)}
            className={clsx(
              'mb-1 flex w-full rounded-sm border px-2 py-1 shadow-sm',
              className,
            )}
          >
            {node.nodes && (
              <span>
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                )}
              </span>
            )}
            <span
              className={clsx(
                'ml-2 text-left font-mono text-sm text-gray-500',
                node.is_selectable && 'font-bold text-gray-600 underline',
              )}
            >
              {resolveNodeText(node.text)}
            </span>
          </Button>
          {node.nodes && isExpanded && (
            <div className="ml-4 border-l border-l-gray-200 pl-4">
              {renderTreeNodes(node.nodes)}
            </div>
          )}
        </div>
      );
    });
  };

  return <div>{renderTreeNodes(treeData)}</div>;
}
