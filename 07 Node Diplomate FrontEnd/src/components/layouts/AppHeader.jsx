import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MagnifyingGlass, HouseLine, CirclesFour, CheckCircle, Gear } from "@phosphor-icons/react";
import { Avatar } from "@mui/material";
import logo from "../../assets/images/logoApp.svg";
import "../../assets/styles/global.css";
import "../../assets/styles/appHeader.css";

// ? ------------------ AppHeader Logic ------->
const AppHeader = () => {
  //# --> useLocation() is a hook from react-router-dom that returns the location object that represents the current URL.
  const location = useLocation();

  //? ------------------ AppHeader Component ------->
  return (
    <div className="heroAppHeader">
      <section className="topSection flex flex-col items-center">
        {/* Image */}
        <div className="logoCon">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        {/* Buttons */}
        <div>
          <ul className="iconsButton">
            <li className={`disabled ${location.pathname === "/" ? "active" : ""}`}>
              <Link to="/">
                <MagnifyingGlass size={25} />
              </Link>
            </li>
            <li className={`disabled ${location.pathname === "/" ? "active" : ""}`}>
              <Link to="/">
                <HouseLine size={25} />
              </Link>
            </li>
            <li className={`${location.pathname === "/app/modules" ? "active" : ""}`}>
              <Link to="/app/modules">
                <CirclesFour size={25} />
              </Link>
            </li>
            <li className={`disabled ${location.pathname === "/app/homeworks" ? "active" : ""}`}>
              <Link to="/app/homeworks">
                <CheckCircle size={25} />
              </Link>
            </li>
          </ul>
        </div>
      </section>
      {/* Settings */}
      <section className="bottomSection">
        <div className={`userPanelIcon ${location.pathname === "/app/userPanel" ? "active" : ""}`}>
          <Link to="/app/userPanel">
            <Gear size={25} />
          </Link>
        </div>

        {/* horitonzal line separator */}
        <div className="lineSeparator"></div>

        {/* Avatar */}
        <div>
          <Link to="/app/userPanel">
            <Avatar alt="Avatar" src="https://avatar.iran.liara.run/public/41" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AppHeader;
