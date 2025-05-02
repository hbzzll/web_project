import React, { useState } from "react";
import { Form, message, Modal, Button } from "antd";

import { useSelector } from "react-redux";
import { request } from "@/utils/request";
import { RootState } from "@/store";

import PropertyForm from "./PropertyForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddPropertyModal: React.FC<Props> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { email } = useSelector((state: RootState) => state.user);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    if (!fileList.length) {
      message.error("Please upload at least one image.");
      message.error("Please upload at least one image.");
      return;
    }
    setShowConfirm(true);
  };

  const Postrequest = async () => {
    try {
      const pendingValues = await form.validateFields();
      const formData = new FormData();
      fileList.forEach((file) => formData.append("images", file.originFileObj));

      //get the urls of the uploaded images
      const uploadRes = await request.post(
        "/api/user/house/publish/images",
        formData
      );

      const property = {
        ...pendingValues,
        email,
        status: 1,
        images: uploadRes.urls,
      };

      await request.post("/api/user/house/publish", property);
      message.success("Property published successfully");
      form.resetFields();
      onSuccess();
    } catch (err) {
      message.error("Failed to submit the form");
    } finally {
      setShowConfirm(false);
      setFileList([]);
    }
  };

  return (
    <Modal
      title="Upload Rental Information"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <PropertyForm fileList={fileList} setFileList={setFileList} />
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Confirm Publish"
        open={showConfirm}
        onOk={Postrequest}
        onCancel={() => {
          setShowConfirm(false);
        }}
      >
        Are you sure to publish this property?
      </Modal>
    </Modal>
  );
};
