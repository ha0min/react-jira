import { useEffect, useState } from "react";

export * from "./http";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    return callback();
    // TODO 依赖项里加上callback会无限循环
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 在上一个useEffect处理完后运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <V>(array: V[]) => {
  const [value, setValue] = useState(array);

  const add = (item: V) => {
    setValue([...value, item]);
  };

  const removeIndex = (index: number) => {
    if (index < 0 || index > value.length - 1) {
      return;
    }
    const newArray = value.slice().splice(index, 1);
    setValue(newArray);
  };

  const clear = () => {
    setValue([]);
  };

  return {
    value,
    add,
    removeIndex,
    clear,
  };
};
