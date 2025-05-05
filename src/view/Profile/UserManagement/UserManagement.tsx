import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Space, message, Popconfirm } from "antd";
import { request } from "@/utils/request";

const UserManagementTable: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await request.get("/api/admin/user/list");
      setUsers(res);
    } catch (err) {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // switch status
  const handlestatus = async (
    userId: string,
    toStatus: "active" | "deactive"
  ) => {
    try {
      await request.put("/api/admin/user/status", { userId, status: toStatus });
      message.success(
        `User ${
          toStatus === "active" ? "activated" : "deactivated"
        } successfully`
      );
      fetchUsers();
    } catch (err) {
      message.error("Status change failed");
    }
  };

  //delete User
  const handledeleteUser = async (userId: string) => {
    try {
      await request.delete(`/api/admin/user/delete/${userId}`);
      message.success("User deleted");
      fetchUsers();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "volcano"}>
          {status === "active" ? "Active" : "Deactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger={record.status === "active"}
            size="small"
            onClick={() =>
              handlestatus(
                record._id,
                record.status === "active" ? "deactive" : "active"
              )
            }
          >
            {record.status === "active" ? "Deactivate" : "Activate"}
          </Button>

          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handledeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={users}
      loading={loading}
      pagination={{ pageSize: 8 }}
    />
  );
};

export default UserManagementTable;
