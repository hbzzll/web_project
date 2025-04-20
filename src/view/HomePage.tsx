import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Rent from "./rent/Rent";
import Header from "../components/Header/Header";
import RentDetail from "../components/RentDetail/RenDetail";
import Profile from "./Profile/Profile";

const HomePage = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/list/:id" element={<RentDetail />} />
        <Route path="/Menu/Profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default HomePage;
