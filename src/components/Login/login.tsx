// import React, { useState } from "react";
// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { Button, Modal, Space } from "antd";

// const LocalizedModal = () => {
//   const [open, setOpen] = useState(false);

//   const showModal = () => {
//     setOpen(true);
//   };

//   const hideModal = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Modal
//       </Button>
//       <Modal
//         title="Modal"
//         open={open}
//         onOk={hideModal}
//         onCancel={hideModal}
//         okText="确认"
//         cancelText="取消"
//       >
//         <p>Bla bla ...</p>
//         <p>Bla bla ...</p>
//         <p>Bla bla ...</p>
//       </Modal>
//     </>
//   );
// };

// type Props = {
//   onClose: () => void;
// };

// const LoginModal: React.FC<Props> = ({ onClose }) => {
//   const [modal, contextHolder] = Modal.useModal();

//   const confirm = () => {
//     modal.confirm({
//       title: "Confirm",
//       icon: <ExclamationCircleOutlined />,
//       content: "Bla bla ...",
//       okText: "确认",
//       cancelText: "取消",
//     });
//   };

//   return (
//     <>
//       <Space>
//         <LocalizedModal />
//         <Button onClick={confirm}>Confirm</Button>
//       </Space>
//       {contextHolder}
//     </>
//   );
// };

// export default LoginModal;

import React from "react";
import { Modal } from "antd";

type Props = {
  onClose: () => void;
  open: boolean;
};

const LoginModal: React.FC<Props> = ({ onClose, open }) => {
  return (
    <Modal
      title="Login"
      open={open}
      onCancel={onClose}
      footer={null}
      maskClosable={false}
    >
      <p>Welcome to the login modal!</p>
      <p>Please enter your credentials.</p>
    </Modal>
  );
};

export default LoginModal;
