import React from "react";
import { Table } from "antd";
import { Project, User } from "../../utils/constant";
import dayjs from "dayjs";

interface PropsType {
  projects: Project[];
  users: any;
}

export const List = ({ projects, users }: PropsType) => {
  return (
    <Table
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
        },
        {
          title: "负责人",
          key: "负责人",
          render(value, projectItem) {
            return (
              <span>
                {users.find((user: User) => user.id === projectItem.personId)
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
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
      dataSource={projects}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {projects.map((projectItem: any) => (
  //         <tr key={projectItem.name}>
  //           <td>{projectItem.name}</td>
  //           <td>
  //             {users.find((user: any) => user.id === projectItem.personId)
  //               ?.name || "未知"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
