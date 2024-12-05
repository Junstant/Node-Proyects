import React, { useState, useRef } from "react";
import handleSubmitResetPassword from "./resetPassword.js";
import createHandleChange from "../../hooks/formHandlers.jsx";
import { Button, FormControl, FormHelperText, InputAdornment, IconButton, TextField } from "@mui/material";
import Header from "../../components/layouts/Header.jsx";
import { useParams } from "react-router-dom";
import { Eye, EyeClosed, PaperPlaneRight, Warning } from "@phosphor-icons/react";
import { usePasswordVisibility } from "../../hooks/passwordSwitch.jsx";
import { ThemeProvider } from "@mui/material/styles";
import lightOne from "../../assets/images/lights/loginRegister/Vector.png";
import lightTwo from "../../assets/images/lights/loginRegister/Vector-1.png";
import lightThree from "../../assets/images/lights/loginRegister/Vector-2.png";
import lightFour from "../../assets/images/lights/loginRegister/Vector-3.png";
import lightFive from "../../assets/images/lights/loginRegister/Vector-4.png";
import lightSix from "../../assets/images/lights/loginRegister/Vector-5.png";
import lineDecor from "../../assets/images/lineDecor.svg";
import userPanel from "../../assets/images/userPanel.png";
import panelsOne from "../../assets/images/lights/loginRegister/panels/panelsOne.png";
import panelsTwo from "../../assets/images/lights/loginRegister/panels/panelsTwo.png";
import panelsThree from "../../assets/images/lights/loginRegister/panels/panelsThree.png";
import "../../assets/styles/global.css";
import "../../assets/styles/forgotPassword.css";
import newTheme from "../../assets/styles/theme.jsx";

// ? --------> Reset password component
const ResetPassword = () => {
  // # -> States to manage form errors
  const [errors, setErrors] = useState({});

  // # -> Custom hook to manage password visibility
  const { showPassword, togglePasswordVisibility, handleMouseDown, handleMouseUp } = usePasswordVisibility();

  // # -> States to manage form values
  const [values, setValues] = useState({ password: "", confirmPassword: "" });

  // # -> Function to handle changes in the fields
  const handleChange = createHandleChange(setValues);

  // # -> Extract the token from the URL
  const { token } = useParams();

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

  // ? ------------------ Reset password component ------->
  return (
    <div>
      <Header></Header>
      <section className="heroForgotPassword">
        {/* ------------------ Reset password ----------- */}
        <div className="leftContainer">
          <h2 className="font-medium text-4xl">Reset password</h2>
          <p className="text-quaternary mt-5">Passwords must be at least 8 characters, one letter, one number and one special character.</p>
          <ThemeProvider theme={newTheme}>
            <form className="w-full flex flex-col gap-6 mt-8" onSubmit={(e) => handleSubmitResetPassword(e, values, setErrors, token)}>
              {/* Password */}
              <div className="w-full">
                <FormControl variant="standard" className="w-full">
                  <TextField
                    error={errors.password ? true : false}
                    label="Password"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={values.password}
                    required
                    autoComplete="new-password"
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={showPassword ? "hide the password" : "display the password"}
                              onClick={togglePasswordVisibility}
                              onMouseDown={handleMouseDown}
                              onMouseUp={handleMouseUp}
                              edge="end"
                            >
                              {showPassword ? <Eye color="#3F4767" /> : <EyeClosed color="#3F4767" />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <FormHelperText>{errors.password && <label className="text-red-500">{errors.password}</label>}</FormHelperText>
                </FormControl>
              </div>
              {/* Confirm Password */}
              <div className="w-full">
                <FormControl variant="standard" className="w-full">
                  <TextField
                    error={errors.confirmPassword ? true : false}
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={values.confirmPassword}
                    required
                    autoComplete="new-password"
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={showPassword ? "hide the password" : "display the password"}
                              onClick={togglePasswordVisibility}
                              onMouseDown={handleMouseDown}
                              onMouseUp={handleMouseUp}
                              edge="end"
                            >
                              {showPassword ? <Eye color="#3F4767" /> : <EyeClosed color="#3F4767" />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <FormHelperText>{errors.confirmPassword && <label className="text-red-500">{errors.confirmPassword}</label>}</FormHelperText>
                </FormControl>
              </div>
              <Button startIcon={<PaperPlaneRight />} sx={{ padding: 2 }} className="btn-filled-custom w-full" type="submit" variant="contained">
                Reset Password
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

export default ResetPassword;
