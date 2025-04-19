import React from "react";
import { Modal } from "antd";
import Interface from "./interface";
type Props = {
  onClose: () => void;
  open: boolean;
};

const LoginModal: React.FC<Props> = ({ onClose, open }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
      centered={true}
    >
      <Interface onClose={onClose} />
    </Modal>
  );
};

export default LoginModal;
