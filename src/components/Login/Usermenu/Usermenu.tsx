import { Dropdown, Avatar, Menu, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Color } from "antd/es/color-picker";

const UserMenu = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "profile",
      label: (
        <span style={{ fontSize: 16, padding: "5px 10px", display: "block" }}>
          Profile
        </span>
      ),
      icon: <ProfileOutlined />,
      onClick: () => navigate("/Menu/Profile"),
    },
    {
      key: "logout",
      label: (
        <span style={{ fontSize: 16, padding: "5px 10px", display: "block" }}>
          Log out
        </span>
      ),
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
