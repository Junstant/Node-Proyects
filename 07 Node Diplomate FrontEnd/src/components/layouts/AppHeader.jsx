import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MagnifyingGlass, HouseLine, CirclesFour, CheckCircle, Gear, DotsThreeOutline } from "@phosphor-icons/react";
import { Avatar, Menu, MenuItem, Tooltip, IconButton } from "@mui/material";
import logo from "../../assets/images/logoApp.svg";
import "../../assets/styles/global.css";
import "../../assets/styles/appHeader.css";
import themeNew from "../../assets/styles/Theme.jsx";
import { ThemeProvider } from "@mui/material";

// ? ------------------ AppHeader Logic ------->
const AppHeader = () => {
  //# --> useLocation() is a hook from react-router-dom that returns the location object that represents the current URL.
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //? ------------------ AppHeader Component ------->
  return (
    <div className="heroAppHeader">
      <ThemeProvider theme={themeNew}>
        <section className="topSection flex flex-col items-center">
          {/* Image */}
          <div className="logoCon">
            <Tooltip title="Home" placement="right">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </Tooltip>
          </div>

          {/* Buttons */}
          <div className="hidden md:block">
            {/* Only visible on non-mobile screens */}
            <ul className="iconsButton">
              <li className={`disabled ${location.pathname === "/" ? "active" : ""}`}>
                <Tooltip title="Search" placement="left">
                  <Link to="/">
                    <MagnifyingGlass size={25} />
                  </Link>
                </Tooltip>
              </li>
              <li className={`disabled ${location.pathname === "/" ? "active" : ""}`}>
                <Tooltip title="Home" placement="left">
                  <Link to="/">
                    <HouseLine size={25} />
                  </Link>
                </Tooltip>
              </li>
              <li className={`${location.pathname === "/app/modules" ? "active" : ""}`}>
                <Tooltip title="Modules" placement="left">
                  <Link to="/app/modules">
                    <CirclesFour size={25} />
                  </Link>
                </Tooltip>
              </li>
              <li className={`disabled ${location.pathname === "/app/homeworks" ? "active" : ""}`}>
                <Tooltip title="Homeworks" placement="left">
                  <Link to="/app/homeworks">
                    <CheckCircle size={25} />
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>

          {/* Dropdown Menu for Mobile */}
          <div className="block md:hidden">
            <IconButton onClick={handleMenuOpen} aria-label="menu">
              <DotsThreeOutline className="text-primary cursor-pointer" size={25} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleMenuClose} className={`${location.pathname === "/" ? "active" : ""}`}>
                <Tooltip title="Search" placement="left">
                  <Link to="/">
                    <MagnifyingGlass size={25} />
                  </Link>
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} className={`${location.pathname === "/" ? "active" : ""}`}>
                <Tooltip title="Home" placement="left">
                  <Link to="/">
                    <HouseLine size={25} />
                  </Link>
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} className={`${location.pathname === "/app/modules" ? "active" : ""}`}>
                <Tooltip title="Modules" placement="left">
                  <Link to="/app/modules">
                    <CirclesFour size={25} />
                  </Link>
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} className={`${location.pathname === "/app/homeworks" ? "active" : ""}`}>
                <Tooltip title="Homeworks" placement="left">
                  <Link to="/app/homeworks">
                    <CheckCircle size={25} />
                  </Link>
                </Tooltip>
              </MenuItem>
            </Menu>
          </div>
        </section>

        {/* Settings */}
        <section className="bottomSection">
          <div className={`userPanelIcon ${location.pathname === "/app/userPanel" ? "active" : ""}`}>
            <Tooltip title="Settings" placement="left">
              <Link to="/app/userPanel">
                <Gear size={25} />
              </Link>
            </Tooltip>
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
      </ThemeProvider>
    </div>
  );
};

export default AppHeader;
