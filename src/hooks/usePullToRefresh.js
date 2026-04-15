import { useCallback, useRef, useState } from "react";

const usePullToRefresh = (refreshFn) => {
  const [refreshing, setRefreshing] = useState(false);
  const isRefreshingRef = useRef(false);

  const onRefresh = useCallback(async () => {
    if (!refreshFn || isRefreshingRef.current) {
      return;
    }

    isRefreshingRef.current = true;
    setRefreshing(true);

    try {
      await refreshFn();
    } finally {
      isRefreshingRef.current = false;
      setRefreshing(false);
    }
  }, [refreshFn]);

  return {
    onRefresh,
    refreshing,
  };
};

export default usePullToRefresh;
