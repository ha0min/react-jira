import React, { useMemo } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "../../utils/base";
import styled from "@emotion/styled";
// import Title from "antd/lib/typography/Title";
import { Button, Row, Typography } from "antd";
// import {useAsync} from "../../utils/use-async";
import { useProjects } from "../../utils/use-projects";
import { useUsers } from "../../utils/use-users";
import { useUrlParam } from "../../utils/http";
import { BaseRow } from "../../component/base/base-row";
import { useProjectsSearchParams } from "./util";

export const ProjectList = (props: {
  setProjectEditorOpen: (isOpen: boolean) => void;
}) => {
  const [numParam, setParam] = useProjectsSearchParams();
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
      <BaseRow between={true} alignItems={"flex-end"} marginBottom={2}>
        <SearchPanel
          users={users || []}
          param={numParam}
          setParam={setParam}
        ></SearchPanel>
        <Button onClick={() => props.setProjectEditorOpen(true)}>
          创建项目
        </Button>
      </BaseRow>

      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={loading}
        dataSource={projects || []}
        users={users || []}
        setProjectEditorOpen={props.setProjectEditorOpen}
      ></List>
    </ProjectListContainer>
  );
};
// ProjectList.whyDidYouRender = true;

const ProjectListContainer = styled.div`
  padding: 3.2rem;
`;
