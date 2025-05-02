import React from "react";
import { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { navlist } from "@/Data/data";
import LoginModal from "../Login/login";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/reducer";
import { useAppDispatch } from "@/store/hooks";
import UserMenu from "../Login/Usermenu/Usermenu";
import { Button } from "antd";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [open, setopen] = useState(false);
  const { isAuth, name } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  return (
    <>
      <header className="header">
        <div className="container flex">
          <Link to="/" className="logo">
            <img src="/images/logo.png" alt="" />
          </Link>

          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {navlist.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            {isAuth ? (
              <UserMenu onLogout={() => dispatch(logout())} />
            ) : (
              <Button
                size="large"
                color="purple"
                variant="filled"
                onClick={() => setopen(true)}
              >
                Sign In
              </Button>
            )}
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
      <LoginModal open={open} onClose={() => setopen(false)} />
    </>
  );
};

export default Header;
