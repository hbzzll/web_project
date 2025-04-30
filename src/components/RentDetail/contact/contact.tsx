import { Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { request } from "@/utils/request";
import { updateProcess } from "@/store/reducer"; // 你可以创建这个 action

interface Props {
  houseId: string;
  onSuccess?: () => void; // 可选 callback
}

const ContactLandlord = ({ houseId, onSuccess }: Props) => {
  const token = localStorage.getItem("token_key");
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      if (!token) {
        message.warning("Please login first.");
        return message.warning("Please login first.");
      }

      await request.post("/api/user/process/add", { houseId });
      message.success("Added to your processing list!");
      message.success("Added to your processing list!");
      // dispatch(updateProcess(res.process)); // 同步 redux

      //   if (onSuccess) onSuccess();
    } catch (err) {
      message.error("Failed to add to process list");
      message.error("Failed to add to process list");
    }
  };

  return (
    <Button className="contact-landlord" onClick={handleClick}>
      Contact landlord
    </Button>
  );
};

export default ContactLandlord;
