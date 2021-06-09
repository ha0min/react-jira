import { useEffect, useState } from "react";

export * from "./server";

export const useMount = (callback: any) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 在上一个useEffect处理完后运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
