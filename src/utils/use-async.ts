import { useCallback, useState } from "react";
import { useMountedRef } from "./base";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

/**
 * 返回异步请求
 * @return isIdle, isLoading,  isError, isSuccess, retry-重试run，用于刷新dom, run-请求, setData, setError, ...state,
 * @param initialState 初始状态-error错误data数据stat请求状态
 * @param initialConfig 设置-throwOnError错误发生时是否抛出
 */
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  // useState 传入函数时会在组件渲染时直接调用-惰性初始state特性
  // 不能直接传入，需要二次封装
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        stat: "error",
        data: null,
      }),
    []
  );

  // 异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      // 未空或不为Promise类型
      if (!promise || !promise.then) {
        throw new Error("run 需要传入 Promise 类型数据");
      }
      // 保留本次run的参数
      setRetry(() => () => {
        if (runConfig?.retry) {
          return run(runConfig?.retry(), runConfig);
        }
      });

      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) {
            setData(data);
          }
          return data;
        })
        .catch((error) => {
          setError(error);
          // 抛出由上级处理
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          // 消化
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    retry,
    run,
    setData,
    setError,
    ...state,
  };
};
