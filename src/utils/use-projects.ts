import { Project } from "./constant";
import { cleanObject, useHttp } from "./index";
import { useEffect } from "react";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};
