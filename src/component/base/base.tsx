// 基本组件

import styled from "@emotion/styled";
import { Button } from "antd";
import React from "react";

export const LeftAlignButton = styled(Button)`
  text-align: left;
`;

export const CreateProjectButton = (props: {
  projectEditorOpen: () => void;
}) => {
  return (
    <LeftAlignButton block={true} onClick={() => props.projectEditorOpen()}>
      创建项目
    </LeftAlignButton>
  );
};
