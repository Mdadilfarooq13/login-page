import React from "react";
import { Layout } from "antd";
import Sidebar from "./sidebar.js";
import Header from "./header.js";

const { Content, Sider } = Layout;

function MainLayout({ children }) {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header />
      <Layout>
        <Sider
          width={200}
          style={{
            overflow: "auto",
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "white",
            scrollbarWidth: "thin",
            scrollbarColor: "unset",
          }}
        >
          <Sidebar />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: "24px",
              margin: 0,
              overflow: "auto",
              insetInlineStart: 0,
              top: 0,
              bottom: 0,
              scrollbarWidth: "thin",
              scrollbarColor: "unset",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
