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

/**
 * 使用url参数来管理project editor的状态
 */
export const useProjectEditor = () => {
  const [{ projectCreate }, setProjectEditorOpenCreate] = useUrlParam([
    "projectCreate",
  ]);

  const open = () => setProjectEditorOpenCreate({ projectCreate: true });
  // 使用false会在关闭时将false转换为字符串继续保留在url param中，改成undefined就可以消除
  const close = () => setProjectEditorOpenCreate({ projectCreate: undefined });

  return {
    isProjectEditorOpen: projectCreate === "true",
    open,
    close,
  };
};
