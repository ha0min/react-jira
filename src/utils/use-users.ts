import { User } from "./constant";
import { cleanObject, useHttp } from "./http";
import { useEffect } from "react";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param, run, client]);

  return result;
};
