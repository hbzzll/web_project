import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { AddPropertyModal } from "./PublishForm/AddPropertyModal";
import "./MyPublish.scss";
import Compo_card from "./Compo_card/Compo_card";
import { request } from "@/utils/request";

const MyPublish = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<any[]>([]);

  const fetchPublish = async () => {
    try {
      const res = await request.get("/api/user/publishHouse/my");
      setList(res);
    } catch (err) {
      message.error("Failed to fetch your published properties");
      message.error("Failed to fetch your published properties");
    }
  };

  useEffect(() => {
    fetchPublish();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Add
      </Button>
      <AddPropertyModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPublish}
      />

      <Compo_card list={list} setList={setList} />
    </div>
  );
};

export default MyPublish;
