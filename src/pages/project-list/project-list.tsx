import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useHttp, useMount } from "../../utils";
import styled from "@emotion/styled";
import Title from "antd/lib/typography/Title";
// import qs from "qs";
// import { apiUrl } from "../../utils/constant";

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 1500);

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const client = useHttp();

  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });

  useEffect(() => {
    // fetch(
    //   `${apiUrl}/projects/?${qs.stringify(cleanObject(debounceParam))}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setProjects(await response.json());
    //   }
    // });
    client("projects", { data: cleanObject(debounceParam) }).then(setProjects);
  }, [debounceParam]);

  return (
    <ProjectListContainer>
      <Title>项目列表</Title>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List projects={projects} users={users}></List>
    </ProjectListContainer>
  );
};

const ProjectListContainer = styled.div`
  padding: 3.2rem;
`;
