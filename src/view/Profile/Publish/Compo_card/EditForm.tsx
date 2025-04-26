import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
} from "antd";
import moment from "moment";
const { Option } = Select;

interface Props {
  open: boolean;
  onCancel: () => void;
  initialData: any;
  onSave: (data: any) => void;
}

const EditForm: React.FC<Props> = ({ open, onCancel, initialData, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue({
        ...initialData,
        availableFrom: initialData.availableFrom //translate string to moment format
          ? moment(initialData.availableFrom)
          : undefined,
      });
    }
  }, [open, initialData]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    onSave({ ...initialData, ...values });
  };
  return (
    <Modal
      title="Edit Property"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSubmit}
      okText="Save"
    >
      <Form form={form} layout="vertical">
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
      </Form>
    </Modal>
  );
};

export default EditForm;
