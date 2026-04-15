import {useCallback, useState} from 'react';

export const useAsync = (asyncFunction, options = {}) => {
  const {initialData = null, immediate = false} = options;

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(immediate);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await asyncFunction(...args);
        setData(response);
        return response;
      } catch (asyncError) {
        setError(asyncError);
        throw asyncError;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  return {
    data,
    error,
    loading,
    setData,
    execute,
  };
};

export default useAsync;
