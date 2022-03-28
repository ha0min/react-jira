// 基础工具

import { useEffect, useRef, useState } from "react";

/**
 * 自定义初始化钩子
 * @param callback
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    return callback();
    // TODO 依赖项里加上callback会无限循环
  }, []);
};

/**
 * 自定义 debounce 钩子
 * @param value-传入将要使用的debouncedValue
 * @param delay-debounce延迟
 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 在上一个useEffect处理完后运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 队列操作
 * @param array
 */
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

/**
 * 设置浏览器标题
 * @param title-浏览器标题
 * @param keepOnUnmount-在卸载组件时是否保留传入标题
 */
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  // const oldTitle = document.title;

  useEffect(() => {
    document.title = title + " - 乌龙看板";
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  });
};

/**
 * 重置路由
 */
export const redirectRoute = () =>
  (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，当组件卸载时为否
 */
export const useMountedRef = () => {
  const mountedRef = useRef<boolean>();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
