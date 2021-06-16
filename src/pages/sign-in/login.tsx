import React, { FormEvent } from "react";
import { useAuth } from "../../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./sign-in";

export const Login = () => {
  const { login, user } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    // console.log(password);
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入账号" }]}
      >
        <Input placeholder={"账号"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  );
};
