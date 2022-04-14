import { useUrlParam } from "../../utils/http";
import { useMemo } from "react";

/**
 * 设置项目列表搜索params
 */
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
