import { Project } from "./constant";
import { cleanObject, useHttp } from "./http";
import { useCallback, useEffect } from "react";
import { useAsync } from "./use-async";

/**
 * 返回项目列表
 * @param param-Partial<Project>
 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, run, fetchProjects]);

  return result;
};

/**
 * 服务端编辑项目请求方法
 * @return mutate-修改函数，传入Project类参数（要修改的参数）
 * @return asyncResult-useAsync异步结果
 */
export const useEditProject = () => {
  // 无参数因为hook必须在顶层调用，无法在渲染时（非顶层）传参
  // 可以返回一个mutate函数，就可以向其中传参
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

/**
 * 服务端添加项目请求方法
 * @return mutate-修改函数，传入Project参数（要添加的项目）
 */
export const useAddProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
