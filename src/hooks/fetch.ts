import { useEffect, useState } from 'react';

interface Options {
  method?: string;
  headers?: Record<string, string>;
}
export default function useFetch(url: string, options: Options = {}) {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchOptions = {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      };

      try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setErrorMessage('Error');
      }
    }

    fetchData();
  }, [url, options]);

  return { data, isError, errorMessage, isLoading };
}
