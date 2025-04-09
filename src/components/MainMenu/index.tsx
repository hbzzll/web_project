import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
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

const items: MenuItem[] = [
  getItem("Option 1", "/page1", <PieChartOutlined />),
  getItem("Option 2", "/page2", <DesktopOutlined />),
  getItem("User", "page3", <UserOutlined />, [
    getItem("Tom", "/page3/301"),
    getItem("Bill", "/page3/302"),
    getItem("Alex", "/page3/303"),
  ]),
  getItem("Team", "page4", <TeamOutlined />, [
    getItem("Team 1", "/page4/401"),
    getItem("Team 2", "/page4/402"),
  ]),
  getItem("Files", "/page5", <FileOutlined />),
];

function MainMenu() {
  const navigateTo = useNavigate();
  const currenRoute = useLocation().pathname;
  const menuClick = (e: { key: string }) => {
    navigateTo(e.key);
  };

  let firstOpenKey: string = "";
  items.forEach((item) => {
    if (item.children?.some((child) => child.key === currenRoute)) {
      firstOpenKey = item.key as string;
    }
  });

  const [openkeys, setOpenKeys] = useState([firstOpenKey]);
  const handleOpenChande = (Keys: string[]) => {
    setOpenKeys([Keys[Keys.length - 1]]);
    console.log(Keys);
  };

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currenRoute]}
      mode="inline"
      items={items}
      onClick={menuClick}
      onOpenChange={handleOpenChande}
      openKeys={openkeys}
    />
  );
}

export default MainMenu;
