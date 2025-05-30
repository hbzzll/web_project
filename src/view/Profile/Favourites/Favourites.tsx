import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import StatusCard from "@/components/RentCard/StatusCard";
import { request } from "@/utils/request";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Favourites = () => {
  const [list, setList] = useState<any[]>([]);
  const token = localStorage.getItem("token_key");
  const favourites = useSelector(
    (state: RootState) => state.user.profile.favourites
  );

  useEffect(() => {
    const fetchPublish = async () => {
      try {
        const res = await request.get("/api/user/favourites/my");
        setList(res);
      } catch (err) {
        message.error("Failed to get favourites");
        message.error("Failed to get favourites");
      }
    };

    fetchPublish();
  }, []);

  return (
    <>
      <div className="house">
        {list.map((item, index) => (
          <div className="rentcard-wrapper" key={index}>
            <StatusCard
              data={item}
              isFavorited={favourites?.includes(item._id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites;
