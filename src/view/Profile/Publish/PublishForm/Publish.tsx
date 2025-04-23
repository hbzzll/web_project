import React from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Select,
  Row,
  Col,
  Switch,
  message,
  Modal,
} from "antd";
import { useState } from "react";
import { request } from "../../../../utils/request";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const { Option } = Select;

const Publish = () => {
  const [form] = Form.useForm();
  const token = localStorage.getItem("token_key");
  const { email } = useSelector((state: RootState) => state.user);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const onFinish = async (values: any) => {
    setPendingValues(values);
    setShowConfirm(true);
  };

  const Postrequest = async () => {
    const property = { ...pendingValues, email: email };
    try {
      const res = await request.post("/api/house/publish", property, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("success");
      message.success("success");
      form.resetFields();
    } catch (err) {
      message.error("An error occurred while submitting the form.");
      message.error("An error occurred while submitting the form.");
    } finally {
      setShowConfirm(false);
      setPendingValues(null);
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          propertyType: "apartment",
          rooms: 1,
          size: 50,
          price: 1000,
          hasElevator: false,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Property Type"
              name="propertyType"
              rules={[
                { required: true, message: "Please select a property type" },
              ]}
            >
              <Select>
                <Option value="apartment">Apartment</Option>
                <Option value="villa">Villa</Option>
                <Option value="cottage">Cottage</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Monthly Rent (¥)"
              name="price"
              rules={[
                { required: true, message: "Please enter the monthly rent" },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Number of Rooms"
              name="rooms"
              rules={[
                { required: true, message: "Please enter the number of rooms" },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Size (sqm)"
              name="size"
              rules={[
                { required: true, message: "Please enter the property size" },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter the city" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Detailed Address"
              name="detailedAddress"
              rules={[
                {
                  required: true,
                  message: "Please enter the detailed address",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Available From"
              name="availableFrom"
              rules={[
                { required: true, message: "Please select the available date" },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Has Elevator"
              name="hasElevator"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Number of Bathrooms"
              name="bathrooms"
              rules={[
                {
                  required: true,
                  message: "Please enter the number of bathrooms",
                },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Number of Balconies" name="balconies">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Modal
          title="Confirm Publish"
          open={showConfirm}
          onOk={Postrequest}
          onCancel={() => setShowConfirm(false)}
        >
          Are you sure to publish this property?
        </Modal>
      </Form>
    </div>
  );
};

export default Publish;
