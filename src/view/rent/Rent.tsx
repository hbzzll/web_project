import React, { useState } from "react";
import { Slider } from "antd";
import "./Rent.scss";
import RentCard from "../../components/RentCard/RentCard";
import { list } from "../../Data/data";

const Rent = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 50]);
  const onChange = (value: number | number[]) => {
    console.log("onChange: ", value);
    if (Array.isArray(value)) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const onChangeComplete = (value: number | number[]) => {
    console.log("onChangeComplete: ", value);
  };

  const filterdata = list.filter(
    (item) =>
      Number(item.price) / 100 >= priceRange[0] &&
      Number(item.price) / 100 <= priceRange[1]
  );

  return (
    <>
      <div className="container-rent">
        <div className="filter">
          <div className="search">
            <span>Location</span>
            <input type="text" placeholder="Search location, city or area" />
          </div>

          <div className="range">
            <span>Price</span>
            <Slider
              range
              step={10}
              defaultValue={[0, 100]}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
            <span>Size</span>
            <Slider
              range
              step={10}
              defaultValue={[20, 50]}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
            <span>Rooms</span>
            <Slider
              range
              step={10}
              defaultValue={[20, 50]}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
          </div>
        </div>

        <div className="house">
          {filterdata.map((item, index) => (
            <RentCard key={index} data={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rent;
