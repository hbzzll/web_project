import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Rent from "./rent/Rent";
import Header from "../components/Header/Header";
import RentDetail from "../components/RentDetail/RenDetail";

const HomePage = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/list/:id" element={<RentDetail />} />
      </Routes>
    </>
  );
};

export default HomePage;
