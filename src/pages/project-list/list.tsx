import React from "react";
import { Button, Menu, Popover, Table, TableProps } from "antd";
import { Project } from "../../utils/constant";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useEditProject } from "../../utils/use-projects";
import { LoveButton } from "../../component/base/love-button";
import {
  EditOutlined,
  PushpinFilled,
  PushpinOutlined,
} from "@ant-design/icons";

interface ListPropsType extends TableProps<Project> {
  users: any;
  refresh: () => void;
  // setProjectEditorOpen: (isOpen: boolean) => void;
  createProjectButton: JSX.Element;
}

// setProjectEditorOpen={props.setProjectEditorOpen}
//<HeartOutlined /><HeartFilled />
export const List = ({ users, refresh, ...props }: ListPropsType) => {
  const { mutate } = useEditProject();

  // 克里化写法
  const pinProject = (id: number) => (pin: boolean) => {
    console.log("love button clicked");
    console.log("pin:" + pin);
    console.log("id:" + id);
    console.log("love button mutated");
    mutate({ id, pin }).then(refresh);
  };

  const pinIcons = {
    lovedIcon: <PushpinFilled style={{ color: "orangered" }} />,
    unlovedIcon: <PushpinOutlined style={{ color: "gray" }} />,
  };

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "收藏",
          align: "center",
          width: "10rem",
          defaultSortOrder: "ascend",
          // sortOrder: "ascend",
          sorter: (x) => (x.pin ? -1 : 1),
          render(value, project) {
            return (
              <LoveButton
                loved={project.pin}
                onClickedChange={pinProject(project.id)}
                tipTitle={"收藏"}
                buttonIcons={pinIcons}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          sorter: (a, b) => a.organization.localeCompare(b.organization),
        },
        {
          title: "负责人",
          key: "负责人",
          render(value, projectItem) {
            return (
              <span>
                {users.find((user: any) => user.id === projectItem.personId)
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          sorter: (a, b) => a.created - b.created,
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Popover
                trigger={"click"}
                placement={"right"}
                title="对项目操作"
                content={
                  <Menu>
                    <Menu.Item key={"编辑"}>
                      {/*<Button onClick={() => props.setProjectEditorOpen(true)}>*/}
                      {/*  编辑*/}
                      {/*</Button>*/}
                    </Menu.Item>
                  </Menu>
                }
              >
                <EditOutlined />
              </Popover>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
