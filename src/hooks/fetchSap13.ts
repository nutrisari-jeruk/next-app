'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { TreeNode } from '@/types/tree-view';

interface Props {
  accounts?: string[];
  categories?: string[];
  kinds?: string[];
  objects?: string[];
  object_details?: string[];
  sub_object_details?: string[];
}

export default function useFetchSap13(props?: Props) {
  const { data: session } = useSession();
  const [data, setData] = useState<TreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const buildQueryParams = (props?: Props) => {
    const params: {
      [key: string]: string | string[];
    } = {
      accounts: props?.accounts || [],
      categories: props?.categories || [],
      kinds: props?.kinds || [],
      objects: props?.objects || [],
      object_details: props?.object_details || [],
      sub_object_details: props?.sub_object_details || [],
    };

    const urlSearchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (Array.isArray(value)) {
        value.forEach((val) => {
          urlSearchParams.append(`${key}[]`, val);
        });
      } else {
        urlSearchParams.append(key, value);
      }
    });

    return urlSearchParams.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            '/v1/masters/accounts/sap13/tree?' +
            buildQueryParams(props),
          {
            headers: {
              Authorization: `Bearer ${session?.user?.token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json: { data: TreeNode[] } = await response.json();

        setData(json.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props, session?.user?.token]);

  return { data, isLoading, isError };
}
