import React, { Dispatch, SetStateAction } from "react";
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
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

interface Props {
  fileList: any[];
  setFileList: Dispatch<SetStateAction<any[]>>;
}

const PropertyForm: React.FC<Props> = ({ fileList, setFileList }) => {
  return (
    <Row gutter={24}>
      <Col span={12}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Enter title" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Property Type"
              name="propertyType"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="apartment">Apartment</Option>
                <Option value="villa">Villa</Option>
                <Option value="cottage">Cottage</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              label="Monthly Rent (kr)"
              name="price"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Rooms" name="rooms" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Size (sqm)"
              name="size"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="City" name="city" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Detailed Address"
              name="detailedAddress"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Available From"
              name="availableFrom"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Col>

      <Col span={12}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Has Elevator"
              name="elevator"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Has Furniture"
              name="furniture"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Pets Allowed"
              name="petsAllowed"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Has Parking"
              name="parking"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Bathrooms" name="bathrooms">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Balconies" name="balconies">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Upload Images">
              <Upload
                listType="picture"
                multiple
                beforeUpload={() => false}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                <Button icon={<UploadOutlined />}>Select Images</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PropertyForm;
