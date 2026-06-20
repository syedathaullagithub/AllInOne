import { useState, useEffect, useCallback } from 'react';
import { bookAPI } from '../services/bookAPI';

export const useApi = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      let data;
      if (url === '/api/books') {
        data = await bookAPI.getBooks();
      } else {
        throw new Error('Unsupported API endpoint');
      }

      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
      console.error('API call failed:', error);
    }
  }, [url]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData, // ← New function to manually refetch
  };
};
