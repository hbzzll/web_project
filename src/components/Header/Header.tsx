import React from "react";
import { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { navlist } from "../../Data/data";
import LoginModal from "../Login/login";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [open, setopen] = useState(false);

  return (
    <>
      <header>
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
            <h4>
              <span>2</span> My List
            </h4>
            <button className="btn1" onClick={() => setopen(true)}>
              <i className="fa fa-sign-out"></i> Sign In
            </button>
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
