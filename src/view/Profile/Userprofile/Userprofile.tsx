import {
  Avatar,
  Button,
  Form,
  Input,
  Space,
  Radio,
  Row,
  Col,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const UserProfile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // 存储 Avatar 的图片 URL

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("保存成功", values);
        setIsEditing(false);
      })
      .catch((err) => console.log("校验失败", err));
  };

  const handleUploadChange = (info: any) => {
    console.log(info.file.originFileObj);
    if (info.file.status === "uploading") {
      return; // 上传中不处理
    }
    if (info.file.originFileObj) {
      // 使用 URL.createObjectURL 生成本地预览 URL
      const previewUrl = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(previewUrl); // 更新头像 URL
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar size={80} src="/images/banner.png">
          U
        </Avatar>{" "}
        {/* 动态显示 Avatar 图片 */}
        <h2>个人信息</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: "John Doe",
          email: "john@example.com",
          phone: "1",
        }}
        disabled={!isEditing}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>

            <Form.Item label="Gender" layout="horizontal">
              <Radio.Group>
                <Radio value="male"> male </Radio>
                <Radio value="female"> female </Radio>
                <Radio value="other"> other </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="intro"
              label="Intro"
              rules={[{ message: "Please input Intro" }]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item label="Upload">
              <Upload
                listType="picture-card"
                showUploadList={false}
                beforeUpload={() => false} // 阻止默认上传行为
                onChange={handleUploadChange} // 监听上传变化
                accept="image/*"
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
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
