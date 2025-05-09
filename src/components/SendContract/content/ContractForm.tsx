import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col } from "antd";
import ContractContent from "./ContractContent";

interface Props {
  contractData: {
    transaction: {
      tenantName: string;
      tenantEmail: string;
      landlordName: string;
      landlordEmail: string;
      updatedAt: string;
    };
    house: {
      city: string;
      detailedAddress: string;
      price: number;
      propertyType: string;
      size: number;
    };
  };
}

const ContractFormPreview: React.FC<Props> = ({ contractData }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>({});

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    setFormData(values);
  };

  const renderField = (label: string, name: string) => {
    const value = formData[name];
    return value ? (
      <p>
        <strong>{label}:</strong> {value}
      </p>
    ) : null;
  };

  useEffect(() => {
    handleFormChange();
  }, []);

  const date = new Date().toLocaleDateString();
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleFormChange}
        style={{ marginBottom: 32 }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Bank Name" name="bankName">
              <Input placeholder="e.g. Handelsbanken" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Bank City" name="bankCity">
              <Input placeholder="e.g. Stockholm" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="IBAN" name="iban">
              <Input placeholder="SE14..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="BIC/SWIFT" name="bic">
              <Input placeholder="HANDSESS" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Bankgiro" name="bankgiro">
              <Input placeholder="889-3257" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Notes" name="notes">
              <Input.TextArea rows={1} placeholder="Optional..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div
        className="contract-preview"
        id="print-area"
        style={{
          fontSize: 20,
          fontWeight: 500,
          lineHeight: 1.5,
          padding: 20,
        }}
      >
        <ContractContent
          transaction={contractData.transaction}
          house={contractData.house}
        />
        <div style={{ marginTop: 10 }}>
          {renderField("Bank Name", "bankName")}
          {renderField("Bank City", "bankCity")}
          {renderField("IBAN", "iban")}
          {renderField("BIC/SWIFT", "bic")}
          {renderField("Bankgiro", "bankgiro")}
          {renderField("Bank Account", "bankAccount")}
          {renderField("Notes", "notes")}
        </div>
        <h3 style={{ marginTop: 30, fontSize: 28 }}>Contract Agreement</h3>
        <p>
          This rental contract is made and entered into by the landlord and the
          tenant as listed above. The tenant agrees to pay the rent in full and
          follow all rental terms.
        </p>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p>
              <strong>Landlord Signature:</strong>
            </p>
            <div
              style={{ height: 50, borderBottom: "1px solid #000", width: 200 }}
            ></div>
          </div>
          <div>
            <p>
              <strong>Tenant Signature:</strong>
            </p>
            <div
              style={{ height: 50, borderBottom: "1px solid #000", width: 200 }}
            ></div>
          </div>
        </div>
        <p style={{ textAlign: "right", marginTop: 20 }}>
          <strong>Date:</strong> {date}
        </p>
      </div>
    </div>
  );
};

export default ContractFormPreview;
