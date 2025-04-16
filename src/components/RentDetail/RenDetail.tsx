import "./RentDetail.scss";
import { useRef } from "react";
import Description from "./description/description";
import Transition from "./img_transition/img_trainsition";
import MapView from "../Mapview";

const RentDetail = () => {
  const mapRef = useRef<HTMLDivElement | null>(null); //?

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const propertyInfo = [
    { label: "Property type", value: "apartment" },
    { label: "Rooms", value: "1" },
    { label: "Size", value: "40 m²" },
    { label: "Price", value: "2,867 kr" },
    { label: "Rental period", value: "Unlimited" },
    { label: "Available from", value: "ASAP" },
    { label: "Pets allowed", value: "No" },
    { label: "Price per m²", value: "72 kr" },
  ];

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
          <div className="title">1 room apartment of 40 m² in Olofström</div>
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
