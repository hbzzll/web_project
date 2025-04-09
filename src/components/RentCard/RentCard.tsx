import "./RentCard.scss";
import { list } from "../../Data/data";

const RentCard = () => {
  return (
    <>
      <div className="content grid3">
        {list.map((val, index) => {
          const { cover, category, name, location, price, type } = val;
          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={cover} alt="" />
              </div>

              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background:
                        category === "For Sale" ? "#25b5791a" : "#ff98001a",
                      color: category === "For Sale" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {category}
                  </span>
                  <i className="fa fa-heart"></i> //爱心
                </div>
                <h4>{name}</h4>
                <p>
                  <i className="fa fa-location"></i>
                  {location}
                </p>
              </div>
              <div className="button flex">
                <div>
                  <button className="btn2">{price}</button>
                  <label htmlFor="">/sqrt</label>
                </div>
                <div>{type}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RentCard;
