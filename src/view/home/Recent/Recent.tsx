import Heading from "../../../components/Heading";
import RentCard from "../../../components/RentCard/RentCard";

const Recent = () => {
  return (
    <>
      <div className="recent padding">
        <div className="container">
          <Heading
            title="Recent Property Listed"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          <RentCard />
        </div>
      </div>
    </>
  );
};

export default Recent;
