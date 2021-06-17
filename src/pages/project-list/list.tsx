import React from "react";
import { Table, TableProps } from "antd";
import { Project } from "../../utils/constant";
import dayjs from "dayjs";

interface ListPropsType extends TableProps<Project> {
  users: any;
}

export const List = ({ users, ...props }: ListPropsType) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "名称",
          key: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      ]}
      {...props}
    />
  );
};
