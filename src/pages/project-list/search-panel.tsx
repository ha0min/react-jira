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
        <UserSelector
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
          selectorOptions={users}
          defaultOptionName={"负责人"}
        />
      </Form.Item>
    </Form>
  );
};
