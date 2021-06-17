import React from "react";
import { useAuth } from "../../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./sign-in";
import { useAsync } from "../../utils/use-async";

export const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = (values: { username: string; password: string }) => {
    run(register(values)).catch(onError);
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
        <Input.Password placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"repassword"}
        dependencies={["password"]}
        rules={[
          { required: true, message: "请确认密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次密码输入不一致！"));
            },
          }),
        ]}
      >
        <Input.Password
          placeholder={"确认密码"}
          type="password"
          id={"repassword"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
