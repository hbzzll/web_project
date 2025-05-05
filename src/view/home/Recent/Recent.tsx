import { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import RentCard from "@/components/RentCard/RentCard";
import { request } from "@/utils/request";
import "./Recent.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Recent = () => {
  const [list, setList] = useState<any[]>([]);
  const favourites = useSelector(
    (state: RootState) => state.user.profile.favourites
  );

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await request.get("/api/house/getrecent");
        setList(res);
      } catch (err) {
        console.error("Error fetching recent properties", err);
      }
    };

    fetchRecent();
  }, []);

  return (
    <>
      <div className="recent padding">
        <div className="container">
          <Heading
            title="Recent Property Listed"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          <div className="recent-card">
            {list.map((item, index) => (
              <RentCard
                key={index}
                data={item}
                isFavorited={favourites?.includes(item._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recent;
