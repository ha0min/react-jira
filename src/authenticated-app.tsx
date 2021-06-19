import React from "react";
import { useAuth } from "./context/auth-context";
import { ProjectList } from "./pages/project-list";
import { Button, Dropdown, Menu } from "antd";
import { ReactComponent as SoftwareLogo } from "./assets/images/software-logo.svg";
import styled from "@emotion/styled";
import { BaseRow } from "./component/base/base-row";
import { useDocumentTitle } from "./utils/base";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectDetail } from "./pages/project-detail/project-detail";

export const AuthenticatedApp = () => {
  useDocumentTitle("项目管理", false);

  return (
    <Container>
      <PageHeader />
      <Body>
        {/*<ProjectList/>*/}
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectList />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectDetail />}
            />
          </Routes>
        </Router>
      </Body>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={"17rem"} color={"#2684ff"} />
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
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
      </HeaderRight>
    </Header>
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
