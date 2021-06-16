import { Input, Select } from "antd";
import React from "react";
import { User } from "../../utils/constant";

interface PropsType {
  users: User[];
  param: any;
  setParam: (param: any) => void;
}

export const SearchPanel = ({ users, param, setParam }: PropsType) => {
  return (
    <form action="">
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((userItem: any) => (
            <Select.Option value={userItem.id} key={userItem.name}>
              {userItem.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
