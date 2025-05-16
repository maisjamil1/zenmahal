import { useState, useEffect } from "react";
function useClientStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) {
  const result = store(callback) as F;
  const [data, setData] = useState<F | undefined>(undefined);

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
}

export default useClientStore;
