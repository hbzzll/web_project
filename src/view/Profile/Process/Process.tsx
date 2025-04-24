import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import RentCard from "../../../components/RentCard/RentCard";
import { request } from "../../../utils/request";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const ProcessingHouses = () => {
  const [list, setList] = useState<any[]>([]);
  const token = localStorage.getItem("token_key");
  const process = useSelector((state: RootState) => state.user.profile.process);
  const favourites = useSelector(
    (state: RootState) => state.user.profile.favourites
  );

  useEffect(() => {
    const fetchProcess = async () => {
      try {
        const res = await request.get("/api/process/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setList(res); // 这里假设后端返回的是房屋列表数组
      } catch (err) {
        message.error("Failed to get processing houses");
      }
    };

    fetchProcess();
  }, []);

  return (
    <div className="house">
      {list.map((item, index) => (
        <div>
          <div>Processed</div>
          <RentCard
            key={index}
            data={item}
            isFavorited={favourites?.includes(item._id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProcessingHouses;
