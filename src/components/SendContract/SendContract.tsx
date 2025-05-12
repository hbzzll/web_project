import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, message, Form, Input } from "antd";
import { request } from "@/utils/request";
import ContractFormPreview from "./content/ContractForm";

const SendContract = () => {
  const [params] = useSearchParams();

  const orderId = params.get("orderId");

  const [contractData, setContractData] = useState<any>(null);
  const [sending, setSending] = useState(false);

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
    //get contract html
    const el = document.getElementById("print-area");
    if (!el) return;
    const html = el.outerHTML;

    try {
      setSending(true);
      await request.post(
        "/api/user/house/contract/sendEmail",
        {
          orderId,
          contractHtml: html,
        },
        {
          timeout: 15000,
        }
      );
      message.success("Email sent successfully!");
      message.success("Email sent successfully!");
    } catch (err) {
      message.error("Failed to send email");
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
      <h2 style={{ fontSize: 30, fontWeight: 600 }}>Contract Preview</h2>

      <ContractFormPreview contractData={contractData} />

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
