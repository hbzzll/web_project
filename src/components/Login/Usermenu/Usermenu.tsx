import { Dropdown, Avatar, Menu, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <ProfileOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      key: "logout",
      label: "Log out",
      icon: <LogoutOutlined />,
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
      <Avatar
        size={40}
        style={{ backgroundColor: "#87d068", cursor: "pointer" }}
        icon={<UserOutlined />}
      />
    </Dropdown>
  );
};

export default UserMenu;
