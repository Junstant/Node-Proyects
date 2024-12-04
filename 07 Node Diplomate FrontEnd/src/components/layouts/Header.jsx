import React, { useState } from "react";
import { Button } from "@mui/material";
import { List, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import "../../assets/styles/global.css";
import "../../assets/styles/header.css";
import logo from "../../assets/images/logo.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme for the close button
  const theme = createTheme({
    palette: {
      primary: {
        main: "#43AFFF",
      },
    },
  });

  return (
    <div className="headerHero">
      {/* Principal menu */}
      <div className="hidden md:flex justify-between items-center w-full">
        {/* Logo */}
        <div className="header">
          <div className="logoCon">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            Studemio
          </div>
        </div>

        {/* Middle container */}
        <ul className="middleCon">
          <li>Product</li>
          <li>Pricing</li>
          <li>Changelog</li>
        </ul>
        <div className="flex flex-row gap-3">
          <Link to="/Login">
            <Button className="btn-outlined-custom" sx={{ px: 4, py: 1, textTransform: "capitalize", fontWeight: 400 }} variant="outlined">
              Login
            </Button>
          </Link>
          <Link to="/Register">
            <Button className="btn-filled-custom" sx={{ px: 3, py: 1, textTransform: "capitalize", fontWeight: 400 }} variant="contained">
              Get Studemio
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden flex flex-row items-center justify-between w-full px-6">
        {/* Logo */}
        <div className="header">
          <div className="flex flex-row items-center gap-3 cursor-pointer logoCon">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            Studemio
          </div>
        </div>

        {/* Hamburguer  menu*/}
        <button className="hamburgerButton" onClick={() => setIsMenuOpen(true)}>
          <List size={25} />
        </button>
      </div>

      {/* Fullscreen menu */}
      {isMenuOpen && (
        <div className="fullscreen-menu">
          <ThemeProvider theme={theme}>
            <Button variant="outlined" className="closeMenu" sx={{ position: "absolute", padding: 1, width: 0 }} onClick={() => setIsMenuOpen(false)}>
              <X size={25} />
            </Button>
          </ThemeProvider>
          <nav className="menu-content">
            <ul>
              <li>
                <Link to="/product" onClick={() => setIsMenuOpen(false)}>
                  Product
                </Link>
              </li>
              <li>
                <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/changelog" onClick={() => setIsMenuOpen(false)}>
                  Changelog
                </Link>
              </li>
            </ul>
            <div className="flex flex-col gap-4 mt-8">
              <Button onClick={() => setIsMenuOpen(false)} className="btn-outlined-custom" sx={{ px: 4, py: 1, textTransform: "capitalize", fontWeight: 400 }} variant="outlined">
                <Link to="/Login">Login</Link>
              </Button>
              <Button onClick={() => setIsMenuOpen(false)} className="btn-filled-custom" sx={{ px: 3, py: 1, textTransform: "capitalize", fontWeight: 400 }} variant="contained">
                <Link to="/Register">Get Studemio</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
