import RentCard from "@/components/RentCard/RentCard";
import React, { useEffect, useState } from "react";
import { request } from "@/utils/request";
import { Button, message, Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EditForm from "./EditForm";

const Compo_card = () => {
  const [list, setList] = useState<any[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItme] = useState<any>(null);
  const token = localStorage.getItem("token_key");
  const favourites = useSelector(
    (state: RootState) => state.user.profile.favourites
  );

  useEffect(() => {
    const fetchPublish = async () => {
      try {
        const res = await request.get("/api/publishHouse/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setList(res);
      } catch (err) {
        message.error("Failed to fetch your published properties");
        message.error("Failed to fetch your published properties");
      }
    };

    fetchPublish();
  }, []);

  const handleCancel = (houseId: string) => {
    Modal.confirm({
      title: "Are you sure to delete this property?",
      content: "Once deleted, it cannot be recovered.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await request.delete(`/api/house/delete/${houseId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          message.success("Property deleted successfully");
          message.success("Property deleted successfully");

          setList((prev) => prev.filter((item) => item._id !== houseId));
        } catch (err) {
          message.error("Failed to delete property");
        }
      },
    });
  };

  const handleEdit = (item: any) => {
    setSelectedItme(item);
    setEditOpen(true);
  };

  const handleSave = async (updatedItem: any) => {
    try {
      const res = await request.put(
        `/api/house/publish/update/${updatedItem._id}`,
        updatedItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  return (
    <div className="house">
      {list.map((item, index) => (
        <div className="rentcard-wrapper">
          <div className="status-tag">Processed</div>

          <RentCard data={item} isFavorited={favourites?.includes(item._id)} />

          <div className="card-actions">
            <Button type="primary" onClick={() => handleEdit(item)}>
              Edit
            </Button>
            <Button danger onClick={() => handleCancel(item._id)}>
              Cancel
            </Button>
          </div>
        </div>
      ))}

      <EditForm
        open={editOpen}
        initialData={selectedItem}
        onCancel={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Compo_card;
