import "./RentDetail.scss";
import { useRef, useEffect, useState } from "react";
import Description from "./description/description";
import Transition from "./img_transition/img_trainsition";
import MapView from "../Mapview";
import { useParams } from "react-router-dom";
import { request } from "../../utils/request";

interface HouseDetail {
  availableFrom: string;
  balconies: number;
  bathrooms: number;
  city: string;
  detailedAddress: string;
  email: string;
  hasElevator: false;
  price: number;
  propertyType: string;
  rooms: number;
  size: number;
  _id: string;
}

const RentDetail = () => {
  const { id } = useParams(); //get id from url
  const [info, setInfo] = useState<HouseDetail | any>({});

  const mapRef = useRef<HTMLDivElement | null>(null); //?

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [propertyInfo, setPropertyInfo] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await request.get(`/api/house/${id}`);
      setInfo(res);

      const transformed = Object.entries(res).map(([key, value]) => ({
        label: key,
        value: String(value),
      }));

      setPropertyInfo(transformed);
    };
    fetchDetail();
  }, [id]);

  const houseImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", // 房子外景
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be", // 客厅
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914", // 餐厅
  ];
  const coordinates = {
    lat: 56.2789,
    lng: 14.5322,
  };
  return (
    <>
      <div className="imag">
        <Transition images={houseImages} />
      </div>
      <div className="container-detail">
        <div className="detail-info">
          <div>Add to favourites</div>
          <div className="title">{info.detailedAddress}</div>
          <div
            className="location"
            onClick={scrollToMap}
            style={{ cursor: "pointer" }}
          >
            RYDS ALLE, SWEDEN
          </div>
          <div className="property">property</div>
          <div>
            <Description data={propertyInfo} />
          </div>

          <div className="map" ref={mapRef} style={{ padding: "70px 0" }}>
            <MapView
              lat={coordinates.lat}
              lng={coordinates.lng}
              label="RYDS ALLE, SWEDEN"
            />
          </div>
          <div className="3d model"> 3d model</div>
        </div>

        <div className="contact-info">
          <div className="contact">
            <div>Monthly rate</div>
            <button className="contact-landlord">Contact landlord</button>
          </div>

          <div className="landlord">
            landlord information
            <div>lanlord name / age / anything</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentDetail;
