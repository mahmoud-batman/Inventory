import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <MdOutlineInventory2 size={35} />
        </div>

        <ul className="home-links">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </li>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Home;
