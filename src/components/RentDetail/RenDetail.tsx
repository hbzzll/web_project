import "./RentDetail.scss";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Description from "./description/description";
import MapView from "../Mapview";
import { useParams } from "react-router-dom";
import { request } from "@/utils/request";
import ContactLandlord from "./contact/contact";
import LandlordInfo from "./landlordinfo/landlordinfo";
import moment from "moment";
import Fade from "./img_transition/img_trainsition";
import { EnvironmentOutlined } from "@ant-design/icons";

const statusMap: { [key: number]: { label: string; color: string } } = {
  0: { label: "Rejected", color: "red" },
  1: { label: "Pending Review", color: "gray" },
  2: { label: "Available", color: "orange" },
  3: { label: "Rented", color: "green" },
  4: { label: "Delisted", color: "black" },
};

const RentDetail = () => {
  const { id } = useParams(); //get id from url
  const [info, setInfo] = useState<any>({});
  const [isOpen, setisOpen] = useState(false);
  const favourites = useSelector(
    (state: RootState) => state.user.profile.favourites
  );

  const mapRef = useRef<HTMLDivElement | null>(null); //?

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [propertyInfo, setPropertyInfo] = useState<
    { label: string; value: string }[]
  >([]);

  const formatBoolean = (value?: boolean) => {
    if (value === true) return "Yes";
    else if (value === false) return "No";
    else return undefined;
  };

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await request.get(`/api/house/${id}`);
      setInfo(res);

      const transformed = [
        { label: "Status", value: statusMap[res.status].label },
        { label: "Property Type", value: res.propertyType },
        { label: "Size", value: `${res.size} m²` },
        { label: "Price", value: `${res.price} kr` },
        { label: "Rooms", value: res.rooms },
        {
          label: "Available From",
          value: moment(res.availableFrom).format("YYYY/MM/DD"),
        },
        { label: "Bathrooms", value: res.bathrooms },
        { label: "Balconies", value: res.balconies },
        { label: "Has Elevator", value: formatBoolean(res.elevator) },
        { label: "Has Furniture", value: formatBoolean(res.furniture) },
        { label: "Parking", value: formatBoolean(res.parking) },
        { label: "petsAllowed", value: formatBoolean(res.petsAllowed) },
      ].filter((item) => item.value !== undefined && item.value !== null);

      setPropertyInfo(transformed);
    };

    fetchDetail();
  }, []);

  const houseImages = info.images || [];
  console.log(houseImages);
  const title = `${info.rooms} rooms ${info.propertyType} of ${info.size} m² in ${info.city}`;

  return (
    <>
      <div className="imag">
        <Fade images={houseImages} />
      </div>
      <div className="container-detail">
        <div className="detail-info">
          <div className="title">{title}</div>
          <div
            className="location"
            onClick={scrollToMap}
            style={{ cursor: "pointer" }}
          >
            <EnvironmentOutlined style={{ marginRight: 5 }} />
            {info.detailedAddress}
          </div>
          <div className="property">property</div>
          <div>
            <Description data={propertyInfo} />
          </div>

          {info.location && (
            <div className="map" ref={mapRef} style={{ padding: "70px 0" }}>
              <MapView
                lat={info.location.lat}
                lng={info.location.lng}
                label="RYDS ALLE, SWEDEN"
              />
            </div>
          )}
          <div className="3d model"> 3d model</div>
        </div>

        <div className="contact-info">
          <div className="contact">
            <div className="contact-card">
              <h3>Monthly Rate</h3>
              <div className="contact-item">
                <span className="value">{info.price} kr</span>
              </div>
              <div className="contact-item">
                <span className="label">Available From:</span>
                <span className="">
                  {moment(info.availableFrom).format("YYYY/MM/DD")}
                </span>
              </div>
              {id && <ContactLandlord houseId={id} />}
            </div>
          </div>

          <div className="landlord">
            <div className="title">Landlord Information</div>
            {id && <LandlordInfo houseId={id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default RentDetail;
