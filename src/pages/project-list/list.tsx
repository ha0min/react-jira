import React from "react";

interface PropsType {
  projects: any;
  users: any;
}

export const List = ({ projects, users }: PropsType) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((projectItem: any) => (
          <tr key={projectItem.name}>
            <td>{projectItem.name}</td>
            <td>
              {users.find((user: any) => user.id === projectItem.personId)
                ?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
