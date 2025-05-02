import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, message, Form, Input } from "antd";
import { request } from "@/utils/request";
import ContractFormPreview from "./content/ContractForm";

const SendContract = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const orderId = params.get("orderId");

  const [contractData, setContractData] = useState<any>(null);
  const [contractHtml, setContractHtml] = useState<string>("");
  const [sending, setSending] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchContractInfo = async () => {
      try {
        const res = await request.get(
          `/api/user/house/contract/info/${orderId}`
        );
        setContractData(res);
      } catch (err) {
        message.error("Failed to fetch contract info");
      }
    };

    fetchContractInfo();
  }, [orderId]);

  const handleSend = async () => {
    try {
      setSending(true);
      await request.post("/api/contract/sendEmail", {
        orderId,
        contractHtml,
      });
      message.success("Email sent successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      message.error("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Print";
    window.print();
    document.title = originalTitle;
  };

  if (!contractData) return <div>Loading contract data...</div>;

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        padding: 20,
        background: "#f5f5f5",
      }}
    >
      <h2>Contract Preview</h2>

      <ContractFormPreview
        contractData={contractData}
        onBuildHtml={(html) => setContractHtml(html)}
      />

      <div style={{ marginTop: 32, display: "flex", gap: 20 }}>
        <Button type="primary" onClick={handleSend} loading={sending}>
          Send Contract
        </Button>
        <Button onClick={handlePrint}>Print Contract</Button>
      </div>
    </div>
  );
};

export default SendContract;
