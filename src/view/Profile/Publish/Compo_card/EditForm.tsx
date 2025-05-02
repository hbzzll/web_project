import React, { useEffect, useState } from "react";
import { Modal, Form, message } from "antd";
import moment from "moment";
import { request } from "@/utils/request";

import PropertyForm from "../PublishForm/PropertyForm";

interface Props {
  open: boolean;
  onCancel: () => void;
  initialData: any;
  onSave: (data: any) => void;
}

const EditForm: React.FC<Props> = ({ open, onCancel, initialData, onSave }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue({
        ...initialData,
        availableFrom: initialData.availableFrom //translate string to moment format
          ? moment(initialData.availableFrom)
          : undefined,
      });

      if (Array.isArray(initialData.images)) {
        const transformed = initialData.images.map((url, index) => ({
          uid: `init-${index}`,
          name: `image-${index}.png`,
          status: "done",
          url,
        }));
        setFileList(transformed);
      }
    }
  }, [open, initialData]);

  const handleSubmit = async () => {
    if (!fileList.length) {
      message.error("Please upload at least one image.");
      message.error("Please upload at least one image.");
      return;
    }
    setShowConfirm(true);
  };

  const transformed = async () => {
    const formData = new FormData();
    const newImages: string[] = [];

    for (const file of fileList) {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      } else if (file.url) {
        newImages.push(file.url);
      }
    }

    const uploadRes = await request.post(
      "/api/user/house/publish/images",
      formData
    );

    const savedUrl = [...newImages, ...uploadRes.urls];
    return savedUrl;
  };

  const handleConfirmSave = async () => {
    try {
      const pendingValues = await form.validateFields();
      const savedUrl = await transformed();

      const property = {
        ...initialData,
        ...pendingValues,
        images: savedUrl,
      };
      console.log(property);
      onSave(property);
    } catch (err) {
      message.error("Failed to save the property");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <Modal
      title="Edit Property"
      open={open}
      onOk={handleSubmit}
      okText="Save"
      onCancel={async () => {
        form.resetFields();
        await setFileList([]);
        onCancel();
      }}
    >
      <Form form={form} layout="vertical">
        <PropertyForm fileList={fileList} setFileList={setFileList} />
      </Form>

      <Modal
        title="Confirm Save"
        open={showConfirm}
        onOk={handleConfirmSave}
        onCancel={() => {
          setShowConfirm(false);
        }}
      >
        Are you sure to save this property?
      </Modal>
    </Modal>
  );
};

export default EditForm;
