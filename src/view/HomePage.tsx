import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Rent from "./rent/Rent";
import Header from "../components/Header/Header";
import RentDetail from "../components/RentDetail/RenDetail";
import Profile from "./Profile/Profile";
import UserProfile from "./Profile/Userprofile/Userprofile";
import Favourites from "./Profile/Favourites/Favourites";
import MyPublish from "./Profile/Publish/MyPublish";
import TransactionTable from "./Profile/Transaction/Transaction";
import Order from "./Profile/Order/Order";
import PrivateRoute from "@/router";

const HomePage = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/list/:id" element={<RentDetail />} />
        <Route
          path="/Menu"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route path="Profile" element={<UserProfile />} />
          <Route path="Transaction" element={<TransactionTable />} />
          <Route path="Favourites" element={<Favourites />} />
          <Route path="MyPublish" element={<MyPublish />} />
          <Route path="Order" element={<Order />} />
        </Route>
      </Routes>
    </>
  );
};

export default HomePage;
