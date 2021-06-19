import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import { useDebounce } from "../../utils/base";
import styled from "@emotion/styled";
// import Title from "antd/lib/typography/Title";
import { Typography } from "antd";
// import {useAsync} from "../../utils/use-async";
import { useProjects } from "../../utils/use-projects";
import { useUsers } from "../../utils/use-users";

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 1500);

  const {
    isLoading: loading,
    error,
    data: projects,
  } = useProjects(debounceParam);
  const { data: users } = useUsers();

  return (
    <ProjectListContainer>
      <Typography.Title>项目列表</Typography.Title>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        loading={loading}
        dataSource={projects || []}
        users={users || []}
      ></List>
    </ProjectListContainer>
  );
};

const ProjectListContainer = styled.div`
  padding: 3.2rem;
`;
