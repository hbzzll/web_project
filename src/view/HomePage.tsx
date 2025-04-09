import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Header from "../components/Header/Header";

const HomePage = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default HomePage;
