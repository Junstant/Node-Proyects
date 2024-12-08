import React, { useState, useRef } from "react";
import handleSubmitForgotPassword from "./forgotPassword.js";
import createHandleChange from "../../hooks/FormHandlers.jsx";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import Header from "../../components/layouts/Header.jsx";
import { PaperPlaneRight, Warning } from "@phosphor-icons/react";
import { ThemeProvider } from "@mui/material/styles";
import lightOne from "../../assets/images/lights/loginRegister/Vector.webp";
import lightTwo from "../../assets/images/lights/loginRegister/Vector-1.webp";
import lightThree from "../../assets/images/lights/loginRegister/Vector-2.webp";
import lightFour from "../../assets/images/lights/loginRegister/Vector-3.webp";
import lightFive from "../../assets/images/lights/loginRegister/Vector-4.webp";
import lightSix from "../../assets/images/lights/loginRegister/Vector-5.webp";
import lineDecor from "../../assets/images/lineDecor.svg";
import userPanel from "../../assets/images/userPanel.webp";
import panelsOne from "../../assets/images/lights/loginRegister/panels/panelsOne.png";
import panelsTwo from "../../assets/images/lights/loginRegister/panels/panelsTwo.png";
import panelsThree from "../../assets/images/lights/loginRegister/panels/panelsThree.png";
import "../../assets/styles/global.css";
import "../../assets/styles/forgotPassword.css";
import newTheme from "../../assets/styles/Theme.jsx";

// ? -------- Forgot password Logic -------->
const ForgotPassword = () => {
  // # -> States to manage form errors
  const [errors, setErrors] = useState({});

  // # -> States to manage form values
  const [values, setValues] = useState({ email: "" });

  // # -> Function to handle changes in the fields
  const handleChange = createHandleChange(setValues);

  // # -> Ref for the user panel image
  const imageRef = useRef(null);

  // # -> Function to handle mouse move on the user panel
  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * -5;

    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  // ? ------------------ Forgot password component ------->
  return (
    <div>
      <Header></Header>
      <section className="heroForgotPassword">
        {/* ------------------ Forgot password ----------- */}
        <div className="leftContainer">
          <h2 className="font-medium text-4xl">Forgot Password</h2>
          <p className="text-quaternary mt-2">Enter your email to receive a password reset link</p>
          <ThemeProvider theme={newTheme}>
            <form className="w-full flex flex-col gap-6 mt-8" onSubmit={(e) => handleSubmitForgotPassword(e, values, setErrors)}>
              <FormControl variant="standard">
                <TextField
                  label="Email"
                  error={errors.email ? true : false}
                  htmlFor="email"
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  value={values.email}
                  autoComplete="email"
                  onChange={handleChange}
                />
                <FormHelperText>{errors.email && <label className="text-red-500">{errors.email}</label>}</FormHelperText>
              </FormControl>
              <Button sx={{ padding: 2 }} className="btn-filled-custom w-full" type="submit" variant="contained" startIcon={<PaperPlaneRight />}>
                Send email
              </Button>
              {errors.general && (
                <p className="errorBadge">
                  <Warning />
                  {errors.general}
                </p>
              )}
            </form>
          </ThemeProvider>
        </div>
        {/* ----------------- Illustration -----------------*/}
        <div className="illustration overflow-hidden p-11" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <img src={userPanel} alt="userPanel" className="tilt-image" ref={imageRef} />
        </div>

        {/* /* ----------------- Lights -----------------*/}
        <div className="lights overflow-hidden">
          <img src={lightOne} alt="lightOne" className="lightOne" />
          <img src={lightTwo} alt="lightTwo" className="lightTwo" />
          <img src={lightThree} alt="lightThree" className="lightThree" />
          <img src={lightFour} alt="lightFour" className="lightFour" />
          <img src={lightFive} alt="lightFive" className="lightFive" />
          <img src={lightSix} alt="lightSix" className="lightSix" />
          <img src={lineDecor} alt="lineDecor" className="lineDecor" />
          <img src={panelsOne} alt="panelsOne" className="panelsOne" />
          <img src={panelsTwo} alt="panelsTwo" className="panelsTwo" />
          <img src={panelsThree} alt="panelsThree" className="panelsThree" />
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
