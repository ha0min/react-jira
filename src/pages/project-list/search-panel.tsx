import { Form, Input, Select } from "antd";
import React from "react";
import { User } from "../../utils/constant";

interface PropsType {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: PropsType["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: PropsType) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          placeholder={"请输入项目名"}
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
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
            <Select.Option value={String(userItem.id)} key={userItem.name}>
              {userItem.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
