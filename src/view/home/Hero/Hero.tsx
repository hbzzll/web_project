import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.scss";
import Heading from "@/components/Heading";

const Hero = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      navigate(`/rent?location=${location}`);
    }
  };

  return (
    <div className="hero">
      <div className="container">
        <Heading
          title="Search Your Next Home"
          subtitle="Find new & featured property located in your local city."
        />

        <form className="search-form" onSubmit={handleSearch}>
          <span className="form-label">Search all properties</span>
          <div className="input-group">
            <input
              type="text"
              placeholder="Search location, city or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
