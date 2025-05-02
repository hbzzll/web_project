import { Table, Button, Tag, message } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import { request } from "@/utils/request";
import moment from "moment";

interface DataType {
  housePrice: number;
  image: string;
  title: string;
  details: string;
  detailedAddress: string;
  tenantName: string;
  tenantEmail: string;
  landlordName: string;
  landlordEmail: string;
  houseId: string;
  orderId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

const statusMap: { [key: number]: { label: string; color: string } } = {
  0: { label: "Terminated", color: "red" },
  1: { label: "In Contact", color: "blue" },
  2: { label: "Rented", color: "green" },
  3: { label: "Termination Requested", color: "orange" },
};

const TransactionTable = () => {
  const [list, setList] = useState<any[]>([]);

  const fetchHouseinfo = async () => {
    try {
      const res = await request.get("/api/user/transaction/my");
      setList(res);
    } catch (err) {
      message.error("Failed to fetch transaction data");
      message.error("Failed to fetch transaction data");
    }
  };

  useEffect(() => {
    fetchHouseinfo();
  }, []);

  const handleCancelContact = async (houseId: string) => {
    try {
      await request.delete(`/api/user/house/progress/delete/${houseId}`);
      message.success("Contact cancelled successfully");
      setList((prev) => prev.filter((item) => item.houseId !== houseId));
    } catch (err) {
      message.error("failed to cancel contact");
    }
  };

  const handleRequestTermination = async (orderId: string) => {
    try {
      const updated = await request.put(
        "/api/user/transaction/request/terminate",
        {
          orderId,
        }
      );

      message.success("Termination request sent successfully");
      setList((prev) =>
        prev.map((item) =>
          item.orderId === orderId ? { ...item, status: updated.status } : item
        )
      );
    } catch (err) {
      message.error("Failed to send termination request");
      message.error("Failed to send termination request");
    }
  };

  const handleCancelRequest = async (orderId: string) => {
    try {
      const updated = await request.put("/api/user/house/request/cancel", {
        orderId,
      });
      message.success("Request cancelled successfully");
      setList((prev) =>
        prev.map((item) =>
          item.orderId === orderId ? { ...item, status: updated.status } : item
        )
      );
    } catch (err) {
      message.error("failed to cancel contact");
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "House",
      key: "house",
      render: (record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 50,
          }}
        >
          <img
            src={record.image}
            alt="House"
            style={{
              width: 180,
              height: 120,
              objectFit: "cover",
            }}
          />
          <div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>{record.title}</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>
              {record.housePrice} kr
            </div>
            <div style={{ fontSize: 15 }}>{record.detailedAddress}</div>
            <div style={{ fontSize: 15 }}>{record.details}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Tenant",
      dataIndex: "tenantName",
      key: "tenantName",
      render: (text, record) => (
        <div>
          <div>{record.tenantName}</div>
          <div style={{ color: "#888", fontSize: 15 }}>
            {record.tenantEmail}
          </div>
        </div>
      ),
    },
    {
      title: "Landlord",
      dataIndex: "landlordName",
      key: "landlordName",
      render: (text, record) => (
        <div>
          <div>{record.landlordName}</div>
          <div style={{ color: "#888", fontSize: 15 }}>
            {record.landlordEmail}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const mapped = statusMap[status];
        return mapped ? <Tag color={mapped.color}>{mapped.label}</Tag> : null;
      },
    },
    {
      title: "Date",
      key: "Date",
      render: (record) => {
        if (record.status === 0) {
          return <div>{moment(record.updatedAt).format("YYYY-MM-DD")}</div>;
        } else {
          return <div>{moment(record.createdAt).format("YYYY-MM-DD")}</div>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        if (record.status === 1) {
          return (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => handleCancelContact(record.houseId)}
            >
              Cancel Contact
            </Button>
          );
        }
        if (record.status === 2) {
          return (
            <Button
              type="primary"
              onClick={() => handleRequestTermination(record.orderId)}
            >
              Request Termination
            </Button>
          );
        }
        if (record.status === 3) {
          return (
            <Button danger onClick={() => handleCancelRequest(record.orderId)}>
              Cancel request
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={list}
      rowKey="orderId"
      pagination={{ pageSize: 6 }}
    />
  );
};

export default TransactionTable;
