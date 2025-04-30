import { useEffect, useState } from "react";
import { Modal, Button, message } from "antd";
import { request } from "@/utils/request"; // 你自己的封装请求库

interface User {
  _id: string;
  name: string;
  email: string;
}

interface ContractModalProps {
  open: boolean;
  houseId: string;
  onClose: () => void;
  //   onContractConfirmed: () => void;
}

const ContractModal = ({
  open,
  houseId,
  onClose,
}: //   onContractConfirmed,
ContractModalProps) => {
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

  const handleSendContract = (userId: string) => {
    setSentContracts((prev) => [...prev, userId]);
    message.success("Contract sent successfully!");
    // 这里如果想要通知后端，可以同时发一个 POST /contract/send API
  };

  const handleConfirmContract = async (userId: string) => {
    try {
      await request.post("/api/user/house/Progress/contract/confirm", {
        houseId,
        userId,
      });
      message.success("Contract confirmed!");
      onClose();
      // onContractConfirmed(); // 通知父组件刷新列表
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
            key={user._id}
            className="flex items-center justify-between p-2 border-b"
          >
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-gray-500 text-sm">{user.email}</div>
            </div>
            <div className="flex gap-2">
              <Button
                type={sentContracts.includes(user._id) ? "default" : "primary"}
                disabled={sentContracts.includes(user._id)}
                onClick={() => handleSendContract(user._id)}
              >
                {sentContracts.includes(user._id)
                  ? "Contract Sent"
                  : "Send Contract"}
              </Button>
              {sentContracts.includes(user._id) && (
                <Button
                  type="primary"
                  onClick={() => handleConfirmContract(user._id)}
                >
                  Confirm Contract
                </Button>
              )}
            </div>
          </div>
        ))
      )}
    </Modal>
  );
};

export default ContractModal;
