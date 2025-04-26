import { Button, Form, Input, Space, Radio, Row, Col, message } from "antd";
import { useEffect, useState } from "react";
import AvatarUpdate from "./update_avatar";
import { request } from "@/utils/request";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const UserProfile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const { name, email, profile } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    setPreviewUrl(profile.avatar || "");
  }, []);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const profile = { ...values, avatar: previewUrl };
      const token = localStorage.getItem("token_key");

      const res = await request.put(
        "/api/user/update",
        { profile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("success");
      setIsEditing(false);
    } catch (err) {
      message.error("failed");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <AvatarUpdate previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />

        <h2 style={{ margin: 20, fontSize: 30, fontWeight: 700 }}>
          User Profile
        </h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        size="large"
        initialValues={{
          name: profile.name,
          contactEmail: profile.contactEmail,
          phone: profile.phone,
          intro: profile.intro,
          gender: profile.gender,
        }}
        disabled={!isEditing}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>

            <Form.Item label="Gender" name="gender" layout="horizontal">
              <Radio.Group>
                <Radio value="male"> male </Radio>
                <Radio value="female"> female </Radio>
                <Radio value="other"> other </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contact Email"
              name="contactEmail"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="intro"
              label="Intro"
              rules={[{ message: "Please input Intro" }]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Space>
        {isEditing ? (
          <>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              onClick={() => {
                setIsEditing(false);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </Space>
    </div>
  );
};

export default UserProfile;
