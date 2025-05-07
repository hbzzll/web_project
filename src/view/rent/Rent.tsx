import React, { useState, useEffect } from "react";
import { Input, Slider, Checkbox } from "antd";
import "./Rent.scss";
import RentCard from "@/components/RentCard/RentCard";
import { request } from "@/utils/request";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSearchParams } from "react-router-dom";
const { Search } = Input;

const priceMarks = {
  0: "0",
  5000: "5k",
  10000: "10k",
  15000: "15k",
  20000: "20k",
};

// Size Slider (0 - 300 m²)
const sizeMarks = {
  0: "0",
  50: "50",
  100: "100",
  150: "150",
  200: "200",
};

// Rooms Slider (0 - 10)
const roomMarks = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
};

const propertyTypes = [
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Cottage", value: "cottage" },
];

const Rent = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 200]);
  const [roomRange, setRoomRange] = useState<[number, number]>([0, 5]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const favourites = useSelector(
    (state: RootState) => state.user.profile.favourites
  );
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await request.get("/api/house/getall");
        setList(res);
      } catch (err) {
        console.error("Error fetching recent properties", err);
      }
    };

    const locationParam = searchParams.get("location");
    if (locationParam) {
      setSearchTerm(locationParam);
    }

    fetchRecent();
  }, []);

  const filterdata = list.filter((item) => {
    const priceOk =
      Number(item.price) >= priceRange[0] &&
      Number(item.price) <= priceRange[1];
    const sizeOk = item.size >= sizeRange[0] && item.size <= sizeRange[1];
    const roomOk = item.rooms >= roomRange[0] && item.rooms <= roomRange[1];
    const searchOk = [item.city, item.title, item.detailedAddress].some(
      (field) => field?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const typeOk =
      selectedTypes.length === 0 || selectedTypes.includes(item.propertyType);
    return priceOk && sizeOk && roomOk && searchOk && typeOk;
  });

  const onSearch = (value: string) => {
    setSearchTerm(value);
  };
  return (
    <>
      <div className="container-rent">
        <div
          className="filter"
          style={{
            width: 300,
            background: "#f5f5f5",
            padding: 30,
            marginRight: 50,
            borderRadius: 8,
          }}
        >
          <div className="search">
            <span style={{ fontWeight: 600 }}>Location</span>
            <Search
              placeholder="Search location, city or area"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              style={{ marginBottom: 20 }}
            />
          </div>

          <div className="type">
            <span style={{ fontWeight: 600 }}>Property Type</span>
            <Checkbox.Group
              options={propertyTypes}
              value={selectedTypes}
              onChange={(list) => setSelectedTypes(list)}
              style={{
                marginTop: 10,
                marginBottom: 20,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            />
          </div>

          <div className="range">
            <span style={{ fontWeight: 600 }}>Price</span>
            <Slider
              range
              marks={priceMarks}
              min={0}
              max={20000}
              defaultValue={[0, 20000]}
              step={5000}
              value={priceRange}
              onChange={(val) => setPriceRange(val as [number, number])}
              style={{ marginBottom: 40 }}
            />

            <span style={{ fontWeight: 600 }}>Size (m²)</span>
            <Slider
              range
              step={50}
              marks={sizeMarks}
              min={0}
              max={200}
              defaultValue={[0, 200]}
              value={sizeRange}
              onChange={(val) => setSizeRange(val as [number, number])}
              style={{ marginBottom: 40 }}
            />

            <span style={{ fontWeight: 600 }}>Rooms</span>
            <Slider
              range
              step={1}
              marks={roomMarks}
              min={0}
              max={5}
              defaultValue={[0, 5]}
              value={roomRange}
              onChange={(val) => setRoomRange(val as [number, number])}
            />
          </div>
        </div>
        <div className="house">
          {filterdata.map((item, index) => (
            <RentCard
              key={index}
              data={item}
              isFavorited={favourites?.includes(item._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rent;
