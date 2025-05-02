import { useEffect, useState } from "react";
import { Modal, Button, message } from "antd";
import { request } from "@/utils/request"; // 你自己的封装请求库

interface User {
  orderId: string;
  tenantId: string;
  tenantName: string;
  tenantEmail: string;
}

interface ContractModalProps {
  open: boolean;
  houseId: string;
  onClose: () => void;
  onRefresh: () => void;
}

const ContractModal = ({
  open,
  houseId,
  onClose,
  onRefresh,
}: ContractModalProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [sentContracts, setSentContracts] = useState<string[]>([]);

  const fetchContactUsers = async () => {
    try {
      const res = await request.get(
        `/api/user/house/publish/getprogressUsers/${houseId}`
      );
      setUsers(res);
    } catch (error) {
      console.error("Failed to fetch contact users", error);
    }
  };

  const handleSendContract = ({
    orderId,
    userId,
  }: {
    orderId: string;
    userId: string;
  }) => {
    setSentContracts((prev) => [...prev, userId]);
    message.success("Contract sent successfully!");

    window.open(`/send-contract?orderId=${orderId}`);
  };

  const handleConfirmContract = async (userId: string) => {
    try {
      await request.post("/api/user/house/Progress/contract/confirm", {
        houseId,
        userId,
      });
      message.success("Contract confirmed!");
      onClose();
      onRefresh();
    } catch (error) {
      message.error("Failed to confirm contract.");
    }
  };

  useEffect(() => {
    if (open) {
      fetchContactUsers();
      setSentContracts([]);
    }
  }, [open, houseId]);

  return (
    <Modal
      open={open}
      title="Select a User to Sign Contract"
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {users.length === 0 ? (
        <div>No users are currently contacting this house.</div>
      ) : (
        users.map((user) => (
          <div
            key={user.tenantId}
            className="flex items-center justify-between p-2 border-b"
          >
            <div>
              <div className="font-semibold">{user.tenantName}</div>
              <div className="text-gray-500 text-sm">{user.tenantEmail}</div>
            </div>
            <div className="flex gap-2">
              <Button
                type={"primary"}
                disabled={sentContracts.includes(user.tenantId)}
                onClick={() =>
                  handleSendContract({
                    orderId: user.orderId,
                    userId: user.tenantId,
                  })
                }
                style={{ margin: "0 10px" }}
              >
                {sentContracts.includes(user.tenantId)
                  ? "Contract Sent"
                  : "Send Contract"}
              </Button>

              <Button
                type="primary"
                onClick={() => handleConfirmContract(user.tenantId)}
              >
                Confirm Contract
              </Button>
            </div>
          </div>
        ))
      )}
    </Modal>
  );
};

export default ContractModal;
