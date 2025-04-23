import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { AddPropertyModal } from "./PublishForm/AddPropertyModal";
import RentCard from "../../../components/RentCard/RentCard";
import { request } from "../../../utils/request";

const Favourites = () => {
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token_key");

  useEffect(() => {
    const fetchPublish = async () => {
      try {
        const res = await request.get("/api/favourites/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
          <div>
            <div>Processed</div>
            <RentCard key={index} data={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites;
