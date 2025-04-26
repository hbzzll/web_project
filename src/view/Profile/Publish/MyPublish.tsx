import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { AddPropertyModal } from "./PublishForm/AddPropertyModal";
import "./MyPublish.scss";
import Compo_card from "./Compo_card/Compo_card";

const MyPublish = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      />

      <Compo_card />
    </div>
  );
};

export default MyPublish;
