import React from "react";
import { useAuth } from "../../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./sign-in";

export const Register = () => {
  const { register } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="username">用户名</label>
    //     <input type="text" id={"username"} />
    //   </div>
    //   <div>
    //     <label htmlFor="password">密码</label>
    //     <input type="password" id={"password"} />
    //   </div>
    //   <button type={"submit"}>注册</button>
    // </form>

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
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
