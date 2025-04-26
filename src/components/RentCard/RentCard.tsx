import "./RentCard.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
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
    name: string;
    detailedAddress: string;
    price: string;
    propertyType: string;
  };
  isFavorited?: boolean;
}

const RentCard = ({ data, isFavorited = false }: RentCardProps) => {
  const dispatch = useAppDispatch();
  const { _id, cover, city, name, detailedAddress, price, propertyType } = data;
  const { token, profile } = useSelector((state: RootState) => state.user);
  const [liked, setLiked] = useState(isFavorited);

  useEffect(() => {
    setLiked(isFavorited);
  }, [isFavorited]);

  const handleFavourite = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!token) {
      return message.warning("Please login to add to favorites");
    }

    try {
      setLiked(!liked);
      const res = await request.post(
        "/api/favourite/trigger",
        {
          houseId: _id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
            <img src="../images/list/p-7.png" alt="" />
          </div>

          <div className="text">
            <div className="category flex">
              <span
                style={{
                  background: city === "For Sale" ? "#25b5791a" : "#ff98001a",
                  color: city === "For Sale" ? "#25b579" : "#ff9800",
                }}
              >
                {city}
              </span>
              <span className="heart-icon" onClick={handleFavourite}>
                {liked ? (
                  <HeartFilled style={{ color: "red", fontSize: "18px" }} />
                ) : (
                  <HeartOutlined style={{ fontSize: "18px" }} />
                )}
              </span>
            </div>
            <h4>{name}</h4>
            <p>
              <i className="fa fa-location"></i>
              {detailedAddress}
            </p>
          </div>
          <div className="button flex">
            <div>
              <button className="btn2">{price}</button>
              <label htmlFor="">/sqrt</label>
            </div>
            <div>{propertyType}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default RentCard;
