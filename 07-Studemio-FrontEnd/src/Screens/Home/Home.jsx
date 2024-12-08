import React, { useRef } from "react";
import Header from "../../components/layouts/Header";
import { Button, ThemeProvider } from "@mui/material";
import themeNew from "../../assets/styles/Theme.jsx";
import "../../assets/styles/global.css";
import "../../assets/styles/home.css";
import lightOne from "../../assets/images/lights/home/Vector.png";
import lightTwo from "../../assets/images/lights/home/Vector-1.png";
import lightThree from "../../assets/images/lights/home/Vector-2.png";
import lightFour from "../../assets/images/lights/home/Vector-3.png";
import lightFive from "../../assets/images/lights/home/Vector-4.png";
import lightSix from "../../assets/images/lights/home/Vector-5.png";
import userPanel from "../../assets/images/userPanel.webp";
import lineDecor from "../../assets/images/lineDecor.svg";
import panelsOne from "../../assets/images/panelsOne.svg";
import panelsTwo from "../../assets/images/panelsTwo.webp";
import panelsThree from "../../assets/images/panelsThree.webp";

// ? ---------- Home Screen ---------->
const Home = () => {

  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  // ? ---------- Home Screen ---------->
  return (
    <main>
      <Header></Header>
      <section className="heroHome">
        {/* Left Container */}
        <div className="leftContainer text-center">
          <h2 className="text-5xl font-light tracking-widest -mb-5">Unlock your full academic</h2>
          <h1 className="text-primary -mb-5">potential</h1>
          <h3 className="text-xl mt-10 mb-10 font-light">Simplify your academic life with smart tools</h3>
          <div className="flex flex-row gap-3">
            <ThemeProvider theme={themeNew}>
              <Button className="btn-outlined-custom" sx={{ px: 4, py: 1, textTransform: "capitalize", fontWeight: 400 }} variant="outlined" color="primary">
                About
              </Button>
              <Button className="btn-filled-custom" sx={{ px: 3, py: 1, textTransform: "capitalize", fontWeight: 400 }} variant="contained" color="primary">
                <a href="/login">Get started</a>
              </Button>
            </ThemeProvider>
          </div>
        </div>
        {/* Illustration */}
        <div className="illustration overflow-hidden p-11" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <img src={userPanel} ref={imageRef} alt="User Panel" className="-z-20 tilt-image" />
        </div>
        {/* Lights */}
        <div className="lights overflow-hidden">
          <img src={lightOne} alt="Light" className="lightOne" />
          <img src={lightTwo} alt="Light" className="lightTwo" />
          <img src={lightThree} alt="Light" className="lightThree" />
          <img src={lightThree} alt="Light" className="lightThree opacity-40" />
          <img src={lightFour} alt="Light" className="lightFour" />
          <img src={lightFour} alt="Light" className="lightFour opacity-40" />
          <img src={lightFive} alt="Light" className="lightFive" />
          <img src={lightSix} alt="Light" className="lightSix" />
          <img src={lineDecor} alt="Line Decor" className="lineDecor" />
          <img src={panelsOne} alt="Panels" className="panelsOne" />
          <img src={panelsTwo} alt="Panels" className="panelsTwo" />
          <img src={panelsThree} alt="Panels" className="panelsThree" />
        </div>
      </section>
    </main>
  );
};

export default Home;
