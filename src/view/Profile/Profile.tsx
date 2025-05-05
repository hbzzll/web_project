import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import UserProfile from "./Userprofile/Userprofile";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem("Profile", "/Profile", <UserOutlined />),
    role === "admin" ? getItem("Users", "/Users", <FileOutlined />) : null,
    getItem("Transaction", "/Transaction", <DesktopOutlined />),
    getItem("Favourites", "/Favourites", <PieChartOutlined />),

    getItem("Property", "sub", <TeamOutlined />, [
      getItem("Publish", "/MyPublish", <TeamOutlined />),
      getItem("Order", "/Order", <TeamOutlined />),
    ]),
    getItem("Log out", "/LogOut", <FileOutlined />),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/Profile"]}
          mode="inline"
          items={items}
          onClick={(info) => navigate(`/Menu${info.key}`)}
        />
      </Sider>

      <Layout
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Content
          style={{
            margin: "0 auto",
            width: "90%",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
