import { Table, Button, Tag, message } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { request } from "@/utils/request";

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
      const res = await request.get("/api/user/property/order");
      setList(res);
    } catch (err) {
      message.error("Failed to fetch transaction data");
      message.error("Failed to fetch transaction data");
    }
  };

  useEffect(() => {
    fetchHouseinfo();
  }, []);

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
          <div style={{ color: "#888", fontSize: "12px" }}>
            {record.tenantEmail}
          </div>
        </div>
      ),
    },
    {
      title: "Landlord",
      dataIndex: "ownerName",
      key: "ownerName",
      render: (text, record) => (
        <div>
          <div>{record.landlordName}</div>
          <div style={{ color: "#888", fontSize: "12px" }}>
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
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updateAt) => {
        return <div>{moment(updateAt).format("YYYY-MM-DD")}</div>;
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
