// 页面级信息

import styled from "@emotion/styled";
import { Button, Result, Spin } from "antd";
import React from "react";
import { DevTools } from "jira-dev-tool";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BaseFullPageLoading = () => (
  <FullPage>
    <Spin tip={"请稍后..."} size="large" />
  </FullPage>
);

export const BaseFullPageError = ({
  error,
  handleButtonClick,
  buttonText,
}: {
  error?: Error | null;
  handleButtonClick?: () => void;
  buttonText?: string;
}) => (
  <FullPage>
    <DevTools />
    <Result
      status="500"
      title={error ? error?.message : "Oops!"}
      subTitle="抱歉，这里出了点问题。"
      extra={
        <Button
          onClick={
            handleButtonClick
              ? handleButtonClick
              : () => window.location.reload()
          }
          type="primary"
        >
          {buttonText ? buttonText : "稍后重试"}
        </Button>
      }
    />
  </FullPage>
);
// export const BaseFullPageLoading = () => <Fullpage> </Fullpage>
