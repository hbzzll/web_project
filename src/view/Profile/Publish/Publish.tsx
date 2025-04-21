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
} from "antd";

const { Option } = Select;

const Publish = () => {
  const onFinish = (values: any) => {
    console.log("Form Data Submitted:", values);
  };

  return (
    <div>
      <h1>Upload Rental Information</h1>
      <Form
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
      </Form>
    </div>
  );
};

export default Publish;
