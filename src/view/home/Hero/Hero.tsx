import "./Hero.scss";
import styles from "./Hero.scss";
import Heading from "@/components/Heading";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="container">
          <Heading
            title="Search Your Next Home "
            subtitle="Find new & featured property located in your local city."
          />

          <form action="" className="form">
            <div className="flex" style={{ flexDirection: "column" }}>
              <span>Search all properties</span>
              <input type="text" placeholder="city" />
              <button className="btn">Search</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Hero;
