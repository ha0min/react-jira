import {
  Button,
  Divider,
  Dropdown,
  List,
  Menu,
  Popover,
  Typography,
} from "antd";
import { useEditProject, useProjects } from "../../utils/use-projects";
import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { isFalsy } from "../../utils/http";
import { CreateProjectButton, LeftAlignButton } from "../base/base";
import { useProjectEditor } from "../../pages/project-list/util";

export const ProjectPopover = () => {
  const { data: projects } = useProjects();
  console.log("ProjectPopover()");

  let pinnedProjects = projects?.filter((project) => project.pin);
  const { open: projectEditorOpen } = useProjectEditor();

  let hasPinnedProjects = isFalsy(pinnedProjects?.length);
  console.log(pinnedProjects?.length);
  console.log(hasPinnedProjects);

  const onMenuOpen = () => {
    console.log("onMenuOpen()");

    console.log("onMenuOpen()");
    pinnedProjects = projects?.filter((project) => project.pin);
    console.log(pinnedProjects);
    hasPinnedProjects = isFalsy(pinnedProjects?.length);
    console.log(hasPinnedProjects);
  };

  // const content = (
  //     <PopoverContainer>
  //         <p><Typography.Text type={"secondary"}>收藏项目</Typography.Text></p>
  //         <List split={false}
  //               itemLayout='vertical'>
  //             {pinnedProjects?.map((project) => (
  //                 <List.Item
  //                     key={project.id}
  //                     // actions={[<Link to={"/projects/" + String(project.id)+"/kanban"}>查看</Link>]}
  //                 >
  //                     <List.Item.Meta title={project.name}/>
  //                 </List.Item>
  //             ))}
  //         </List>
  //         <p><Typography.Text type={"secondary"}>快速操作</Typography.Text>
  //         </p>
  //         <Button onClick={() => props.setProjectEditorOpen(true)}>创建项目</Button>
  //     </PopoverContainer>
  // );

  const menuContent = (
    <PopoverMenu>
      <Menu.ItemGroup title="收藏项目">
        {hasPinnedProjects ? (
          pinnedProjects?.map((project) => (
            <Menu.Item key={project.id}>
              <LeftAlignButton block={true} type="text">
                {project.name}
              </LeftAlignButton>
            </Menu.Item>
          ))
        ) : (
          <Menu.Item key={"_default"}>
            <LeftAlignButton block={true} disabled={true}>
              暂无收藏项目
            </LeftAlignButton>
          </Menu.Item>
        )}
      </Menu.ItemGroup>
      <Menu.ItemGroup title="快捷操作">
        <Menu.Item key={"createProject"}>
          <CreateProjectButton projectEditorOpen={projectEditorOpen} />
        </Menu.Item>
      </Menu.ItemGroup>
    </PopoverMenu>
  );

  return (
    <>
      {/*<Popover placement={"bottom"} content={content}>*/}
      {/*    <h3>项目</h3>*/}
      {/*</Popover>*/}
      <Dropdown
        overlay={menuContent}
        placement={"bottomCenter"}
        trigger={["hover"]}
        onVisibleChange={onMenuOpen}
      >
        <Button type={"text"} onClick={testClick}>
          <h3>项目</h3>
        </Button>
      </Dropdown>
    </>
  );
};

const testClick = () => {
  console.log("testClick()");
  console.log("window.location.href: " + window.location.href);
  console.log("window.location.origin: " + window.location.origin);
  window.location.href = window.location.origin + "/projects";
};

const PopoverMenu = styled(Menu)`
  min-width: 28rem;
  padding: 1rem 1rem 2rem 1rem;
`;
