import { Form, Input, Select } from "antd";
import React from "react";
import { Project, User } from "../../utils/constant";
import { UserSelector } from "../../component/user-selector/user-selector";

interface SearchPanelPropsType {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelPropsType["param"]) => void;
}

export const SearchPanel = ({
  users,
  param,
  setParam,
}: SearchPanelPropsType) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          placeholder={"输入项目名以搜索"}
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
        {/*<Select*/}
        {/*  value={param.personId}*/}
        {/*  onChange={(value) => {*/}
        {/*    setParam({*/}
        {/*      ...param,*/}
        {/*      personId: value,*/}
        {/*    });*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Select.Option value={""}>负责人</Select.Option>*/}
        {/*  {users.map((userItem: any) => (*/}
        {/*    <Select.Option value={String(userItem.id)} key={userItem.name}>*/}
        {/*      {userItem.name}*/}
        {/*    </Select.Option>*/}
        {/*  ))}*/}
        {/*</Select>*/}
        <UserSelector
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
          options={users}
          defaultOptionName={"负责人"}
        />
      </Form.Item>
    </Form>
  );
};
