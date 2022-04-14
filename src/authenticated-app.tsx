import React, { useState } from "react";
import { useAuth } from "./context/auth-context";
import { ProjectList } from "./pages/project-list";
import { Button, Dropdown, Menu } from "antd";
import { ReactComponent as SoftwareLogo } from "./assets/images/software-logo.svg";
import styled from "@emotion/styled";
import { BaseRow } from "./component/base/base-row";
import { redirectRoute, useDocumentTitle } from "./utils/base";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectDetail } from "./pages/project-detail/project-detail";
import { ProjectEditor } from "./component/project-editor/project-editor";
import { ProjectPopover } from "./component/project-popover/project-popover";
import { LeftAlignButton } from "./component/base/base";

export const AuthenticatedApp = () => {
  useDocumentTitle("项目管理", false);

  return (
    <Container>
      <Router>
        <PageHeader />
        <Body>
          <Routes>
            <Route path={"/projects"} element={<ProjectList />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectDetail />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Body>
        <ProjectEditor />
      </Router>
    </Container>
  );
};

const CreateProjectButton = (props: {
  setProjectEditorOpen: (isOpen: boolean) => void;
}) => {
  return (
    <LeftAlignButton
      block={true}
      onClick={() => props.setProjectEditorOpen(true)}
    >
      创建项目
    </LeftAlignButton>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={redirectRoute} style={{ padding: 0 }}>
          <SoftwareLogo width={"17rem"} color={"#2684ff"} />
        </Button>
        <ProjectPopover />
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <UserStatus />
      </HeaderRight>
    </Header>
  );
};

const UserStatus = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(event) => event.preventDefault()}>
        👋你好，{user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(BaseRow)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.12);
  z-index: 1;
`;

const HeaderLeft = styled(BaseRow)``;

const HeaderRight = styled.div``;

// const HeaderItem = styled.h3`
//
// `

const Body = styled.main``;

// const Nav = styled.nav`
//   grid-area: nav;
// `;
//
// const Aside = styled.aside`
//   grid-area: aside;
// `;
//
// const Footer = styled.footer`
//   grid-area: footer;
// `;
