import "./RentCard.scss";
import { list } from "../../Data/data";
import { Link } from "react-router-dom";

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
}

const RentCard = ({ data }: RentCardProps) => {
  const { _id, cover, city, name, detailedAddress, price, propertyType } = data;
  return (
    <>
      <div className="content grid3">
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
              <i className="fa fa-heart"></i> //爱心
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
