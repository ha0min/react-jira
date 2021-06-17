import React from "react";
import { useAuth } from "../../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./sign-in";
import { useAsync } from "../../utils/use-async";

export const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    run(login(values)).catch(onError);
    // console.log("submit")
    // try {
    //     console.log("await run")
    //     await run(login(values));
    // } catch (e) {
    //     console.log("onError", e)
    //     onError(e);
    // }
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
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  );
};
