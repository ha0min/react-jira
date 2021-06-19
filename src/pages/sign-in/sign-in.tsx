import React, { useEffect, useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import { Button, Card, Divider, message } from "antd";
import styled from "@emotion/styled";
import logo from "../../assets/images/logo.svg";
import left from "../../assets/images/left.svg";
import right from "../../assets/images/right.svg";
import { useDocumentTitle } from "../../utils/base";

export const SignIn = () => {
  const [registerNow, setRegisterNow] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("统一认证", false);

  return (
    <Container>
      <Header />
      <Background />
      <SignInCard>
        <Title>{registerNow ? "👏注册" : "👋登陆"}</Title>
        {error ? message.error(error.message, 3, () => setError(null)) : null}
        {registerNow ? (
          <Register onError={setError} />
        ) : (
          <Login onError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={() => setRegisterNow(!registerNow)}>
          {registerNow ? "已有账号？去登陆" : "没有账号？去注册"}
        </Button>
      </SignInCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const SignInCard = styled(Card)`
  width: 40rem;
  min-height: 46rem;
  padding: 3.2rem 4rem;
  border-radius: 0.4rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
