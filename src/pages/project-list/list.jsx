import React from "react";

export const List = ({projects, users}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
            {
                projects.map(projectItem => (
                    <tr key={projectItem.name}>
                        <td>{projectItem.name}</td>
                        <td>{users.find(user => user.id === projectItem.personId)?.name || "未知"}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}
