import { Project } from "./constant";
import { cleanObject, useHttp } from "./http";
import { useEffect } from "react";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = () =>
    client("projects", { data: cleanObject(param || {}) });
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param]);

  return result;
};

export const useEditProject = () => {
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
