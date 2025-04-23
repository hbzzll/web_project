import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { AddPropertyModal } from "./PublishForm/AddPropertyModal";
import RentCard from "../../../components/RentCard/RentCard";
import { request } from "../../../utils/request";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const MyPublish = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const token = localStorage.getItem("token_key");
  const favourites = useSelector(
    (state: RootState) => state.user.profile.favourites
  );

  useEffect(() => {
    const fetchPublish = async () => {
      try {
        const res = await request.get("/api/publishHouse/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setList(res);
      } catch (err) {
        message.error("Failed to fetch your published properties");
        message.error("Failed to fetch your published properties");
      }
    };

    fetchPublish();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Add
      </Button>
      <AddPropertyModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="house">
        {list.map((item, index) => (
          <div>
            <div>Processed</div>
            <RentCard
              key={index}
              data={item}
              isFavorited={favourites?.includes(item._id)}
            />
            <Button className="edit">Edit</Button>
            <Button className="cancel">Cancel</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPublish;
