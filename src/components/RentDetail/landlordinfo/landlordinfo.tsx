import React, { useEffect, useState } from "react";
import { request } from "../../../utils/request";
import "./landlordinfo.scss";

interface Props {
  houseId: string;
}

const LandlordInfo = ({ houseId }: Props) => {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await request.get(`/api/landlord/${houseId}`);
        setInfo(res);
      } catch (err) {
        console.error("Failed to fetch landlord info", err);
      }
    };

    fetchLandlord();
  }, [houseId]);

  if (!info) return <div>Loading landlord info...</div>;

  return (
    <div className="landlord-card">
      <div className="avatar">
        <img src={info.avatar} alt="avatar" />
      </div>
      <div className="details">
        <h3>{info.name}</h3>
        <p>
          <b>Email:</b> {info.email}
        </p>
        <p>
          <b>Phone:</b> {info.phone}
        </p>
        <p>
          <b>Gender:</b> {info.gender}
        </p>
        <p>
          <b>Intro:</b> {info.intro}
        </p>
      </div>
    </div>
  );
};

export default LandlordInfo;
