import React from "react";
import { Table } from "antd";
import { Project, User } from "../../utils/constant";

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
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, projectItem) {
            return (
              <span>
                {users.find((user: User) => user.id === projectItem.personId)
                  ?.name || "未知"}
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
