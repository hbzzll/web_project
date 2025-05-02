import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { request } from "@/utils/request";
import { Button, message, Modal, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EditForm from "./EditForm";
import StatusCard from "@/components/RentCard/StatusCard";
import ContractModal from "./ContractModal";

interface Props {
  list: any[];
  setList: Dispatch<SetStateAction<any[]>>;
}

const Compo_card: React.FC<Props> = ({ list, setList }) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedItem, setSelectedItme] = useState<any>(null);
  const favourites = useSelector(
    (state: RootState) => state.user.profile.favourites
  );

  const otherList = list.filter((item) => item.status !== 3);
  const rentedList = list.filter((item) => item.status === 3);

  //Cancel operation
  const handleCancel = (houseId: string) => {
    Modal.confirm({
      title: "Are you sure to delete this property?",
      content: "Once deleted, it cannot be recovered.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await request.delete(`/api/user/house/delete/${houseId}`);
          message.success("Property deleted successfully");
          message.success("Property deleted successfully");

          setList((prev) => prev.filter((item) => item._id !== houseId));
        } catch (err) {
          message.error("Failed to delete property");
        }
      },
    });
  };

  //Edit Modal
  const handleEdit = (item: any) => {
    setSelectedItme(item);
    setEditOpen(true);
  };

  const handleSave = async (updatedItem: any) => {
    try {
      const res = await request.put(
        `/api/user/house/publish/update/${updatedItem._id}`,
        updatedItem
      );
      message.success("Updated successfully");
      message.success("Updated successfully");

      setList((prev) =>
        prev.map((item) => (item._id === updatedItem._id ? res : item))
      );
      setEditOpen(false);
    } catch (err) {
      message.error("Failed to update");
    }
  };

  //Contact User Modal
  const handleOpenUserList = (houseId: string) => {
    setSelectedId(houseId);
    setContactOpen(true);
  };

  const handleReleaseContract = (houseId: string) => {
    Modal.confirm({
      title: "Confirm Release",
      content: "Do you want to approve or reject the termination request?",
      okText: "Approve Termination",
      cancelText: "Reject Request",
      onOk: async () => {
        try {
          await request.post("/api/user/contract/termination/approve", {
            houseId,
          });
          message.success("Contract terminated successfully");
          setList((prev) =>
            prev.map((item) =>
              item._id === houseId ? { ...item, status: 2 } : item
            )
          );
        } catch (err) {
          message.error("Failed to terminate contract");
        }
      },
      onCancel: async () => {
        try {
          await request.post("/api/user/contract/termination/reject", {
            houseId,
          });
          message.success("Termination request rejected");
          setList((prev) =>
            prev.map((item) =>
              item._id === houseId
                ? { ...item, transactionStatus: "rented" }
                : item
            )
          );
        } catch (err) {
          message.error("Failed to reject termination request");
        }
      },
    });
  };

  return (
    <>
      <Divider style={{ padding: "20px 0px", fontSize: 20 }}>My Houses</Divider>
      <div className="house">
        {otherList.map((item, index) => (
          <div className="rentcard-wrapper" key={index}>
            <StatusCard
              data={item}
              isFavorited={favourites?.includes(item._id)}
            />

            <div className="card-actions">
              <Button type="primary" onClick={() => handleEdit(item)}>
                Edit
              </Button>
              <Button danger onClick={() => handleCancel(item._id)}>
                Cancel
              </Button>
              <Button
                icon={<UserOutlined />}
                onClick={() => handleOpenUserList(item._id)}
              />
            </div>
          </div>
        ))}
      </div>

      {rentedList.length > 0 && (
        <Divider style={{ padding: "20px 0px", fontSize: 20 }}>
          Rented Houses
        </Divider>
      )}

      <div className="house">
        {rentedList.map((item, index) => (
          <div className="rentcard-wrapper" key={index}>
            <StatusCard
              data={item}
              isFavorited={favourites?.includes(item._id)}
            />

            <div className="card-actions">
              <Button
                danger
                disabled={item.transactionStatus !== 3}
                onClick={() => handleReleaseContract(item._id)}
              >
                Release Contract
              </Button>
            </div>
          </div>
        ))}
      </div>

      <EditForm
        open={editOpen}
        initialData={selectedItem}
        onCancel={() => setEditOpen(false)}
        onSave={handleSave}
      />

      <ContractModal
        open={contactOpen}
        houseId={selectedId!}
        onClose={() => setContactOpen(false)}
        onRefresh={() =>
          setList((prev) =>
            prev.map((item) =>
              item._id === selectedId ? { ...item, status: 3 } : item
            )
          )
        }
      />
    </>
  );
};

export default Compo_card;
