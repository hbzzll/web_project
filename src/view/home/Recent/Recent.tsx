import Heading from "../../../components/Heading";
import RentCard from "../../../components/RentCard/RentCard";
import { list } from "../../../Data/data";
import "./Recent.scss";
const Recent = () => {
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
              <RentCard key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recent;
