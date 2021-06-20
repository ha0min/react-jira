import React, { useMemo } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "../../utils/base";
import styled from "@emotion/styled";
// import Title from "antd/lib/typography/Title";
import { Button, Typography } from "antd";
// import {useAsync} from "../../utils/use-async";
import { useProjects } from "../../utils/use-projects";
import { useUsers } from "../../utils/use-users";
import { useUrlParam } from "../../utils/http";

export const ProjectList = () => {
  const [param, setParam] = useUrlParam(["name", "personId"]);
  const numParam = useMemo(
    () => ({ ...param, personId: Number(param.personId) || undefined }),
    [param]
  );
  const {
    isLoading: loading,
    error,
    data: projects,
    retry,
  } = useProjects(useDebounce(numParam, 1500));
  const { data: users } = useUsers();

  return (
    <ProjectListContainer>
      <Typography.Title>项目列表</Typography.Title>
      <Button onClick={retry}>retry</Button>
      <SearchPanel
        users={users || []}
        param={numParam}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={loading}
        dataSource={projects || []}
        users={users || []}
      ></List>
    </ProjectListContainer>
  );
};
ProjectList.whyDidYouRender = true;

const ProjectListContainer = styled.div`
  padding: 3.2rem;
`;
