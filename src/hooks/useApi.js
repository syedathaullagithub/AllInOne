import { useState, useEffect } from 'react';
import { bookAPI } from '../services/bookAPI';

export const useApi = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        let data;
        if (url === '/api/books') {
          data = await bookAPI.getBooks();
        } else {
          throw new Error('Unsupported API endpoint');
        }

        if (isMounted) {
          setState({
            data,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          });
          console.error('API call failed:', error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
};
