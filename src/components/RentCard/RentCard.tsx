import "./RentCard.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HeartOutlined,
  HeartFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { request } from "@/utils/request";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { message } from "antd";
import { useAppDispatch } from "@/store/hooks";
import { updateFavourites } from "@/store/reducer"; // Adjust the path based on your project structure

interface RentCardProps {
  data: {
    _id: string;
    cover: string;
    category: string;
    title: string;
    detailedAddress: string;
    price: string;
    propertyType: string;
  };
  isFavorited?: boolean;
}

const RentCard = ({ data, isFavorited = false }: RentCardProps) => {
  const dispatch = useAppDispatch();
  const {
    _id,
    cover,
    city,
    title,
    detailedAddress,
    price,
    propertyType,
    images,
    rooms,
    size,
  } = data;
  const { token, profile } = useSelector((state: RootState) => state.user);
  const [liked, setLiked] = useState(isFavorited);

  useEffect(() => {
    setLiked(isFavorited);
  }, [isFavorited]);

  const handleFavourite = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!token) {
      message.warning("Please login to add to favorites");
      p;
      return message.warning("Please login to add to favorites");
    }

    try {
      setLiked(!liked);
      const res = await request.post("/api/user/favourite/trigger", {
        houseId: _id,
      });
      dispatch(updateFavourites(res.favourites));
    } catch (err) {
      message.error("Failed to update favorite");
      setLiked(liked);
    }
  };

  return (
    <>
      <div className="grid3">
        <Link to={`/list/${_id}`} className="box shadow">
          <div className="img">
            <img
              src={images ? images[0] : "../images/list/p-7.png"}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="text">
            <div className="category flex">
              <span
                style={{
                  background: "#ff98001a",
                  color: "#ff9800",
                }}
              >
                {rooms} rooms · {propertyType} · {size} m²
              </span>
              <span className="heart-icon" onClick={handleFavourite}>
                {liked ? (
                  <HeartFilled style={{ color: "red", fontSize: 22 }} />
                ) : (
                  <HeartOutlined style={{ fontSize: 22 }} />
                )}
              </span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
              {title}
            </div>
            <div style={{ color: "#555" }}>
              <EnvironmentOutlined style={{ marginRight: 5 }} />
              {detailedAddress}
            </div>
          </div>
          <div className="button flex">
            <div>
              <div className="btn2">{price} kr/ Month</div>
            </div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>{propertyType}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default RentCard;
