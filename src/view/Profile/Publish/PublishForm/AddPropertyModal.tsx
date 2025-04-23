import React from "react";
import { Modal } from "antd";
import Publish from "./Publish";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddPropertyModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      title="Upload Rental Information"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Publish />
    </Modal>
  );
};
