import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../../utils/use-projects";
import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const ProjectPopover = (props: {
  setProjectEditorOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <PopoverContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List split={false}>
        {pinnedProjects?.map((project) => (
          <List.Item
            key={project.id}
            // actions={[<Link to={"/projects/" + String(project.id)+"/kanban"}>查看</Link>]}
          >
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button onClick={() => props.setProjectEditorOpen(true)}>创建项目</Button>
    </PopoverContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <h3>项目</h3>
    </Popover>
  );
};

const PopoverContainer = styled.div`
  min-width: 30rem;
`;
