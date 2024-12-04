import React, { useState, useRef } from "react";
import handleSubmitLogin from "./login.js";
import handleSubmitRegister from "./register.js";
import { Button, Checkbox, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { Eye, EyeClosed, PaperPlaneRight, Info } from "@phosphor-icons/react";
import { usePasswordVisibility } from "../../hooks/passwordSwitch.jsx";
import Header from "../../components/layouts/Header.jsx";
import useUserStore from "../../stores/userStore.js";
import { useNavigate, useLocation, Link } from "react-router-dom";
import createHandleChange from "../../hooks/formHandlers.jsx";
import SmoothAlert from "../../components/common/SmoothAlert.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import lightOne from "../../assets/images/lights/loginRegister/Vector.png";
import lightTwo from "../../assets/images/lights/loginRegister/Vector-1.png";
import lightThree from "../../assets/images/lights/loginRegister/Vector-2.png";
import lightFour from "../../assets/images/lights/loginRegister/Vector-3.png";
import lightFive from "../../assets/images/lights/loginRegister/Vector-4.png";
import lightSix from "../../assets/images/lights/loginRegister/Vector-5.png";
import lineDecor from "../../assets/images/lineDecor.svg";
import userPanel from "../../assets/images/userPanel.png";
import panelsOne from "../../assets/images/panelsOne.svg";
import panelsTwo from "../../assets/images/panelsTwo.png";
import panelsThree from "../../assets/images/panelsThree.png";
import "../../assets/styles/global.css";
import "../../assets/styles/loginRegister.css";
import newTheme from "../../assets/styles/theme.jsx";

// ? ------------------ Login and register logic ------->
const LoginRegister = () => {
  // # -> Navigate hook
  const navigate = useNavigate();

  // # -> Custom hook to manage password visibility
  const { showPassword, togglePasswordVisibility, handleMouseDown, handleMouseUp } = usePasswordVisibility();

  // # -> States to manage form values
  const [valuesLogin, setValuesLogin] = useState({ email: "", password: "" });
  const [valuesRegister, setValuesRegister] = useState({ name: "", email: "", password: "" });

  // # -> States to manage form errors
  const [errorsLogin, setErrorsLogin] = useState({});
  const [errorsRegister, setErrorsRegister] = useState({});

  // # -> Function to handle changes in the login fields
  const handleChangeLogin = createHandleChange(setValuesLogin);

  // # -> Function to handle changes in the register fields
  const handleChangeRegister = createHandleChange(setValuesRegister);

  // # -> Custom hook to manage the user state
  const { setUserTokenFunc, setUser } = useUserStore();

  // # -> Location hook
  const location = useLocation();
  const alertMessage = location.state?.alertMessage || "";

  // # -> Ref for the user panel image
  const imageRef = useRef(null);

  // # -> Function to handle mouse move on the user panel
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

  // # -> State to manage login or register
  const [loginOrRegister, setLoginOrRegister] = useState("login");

  // ? ------------------ Login and register component ------->
  return (
    <main>
      <Header></Header>
      {alertMessage && <SmoothAlert message={alertMessage} severity="error" />}

      <section className="heroLoginRegister">
        {/* ---------------------- Change login or register ---------------- */}
        <div className="leftContainer">
          <Stack direction="row" spacing={5}>
            <button style={{ color: loginOrRegister === "login" ? "white" : "#3F4767" }} onClick={() => setLoginOrRegister("login")}>
              <h2 className="font-medium text-6xl">Login</h2>
            </button>
            <h2 className="font-medium text-6xl separator">/</h2>
            <button style={{ color: loginOrRegister === "register" ? "white" : "#3F4767" }} onClick={() => setLoginOrRegister("register")}>
              <h2 className="font-medium text-6xl">Register</h2>
            </button>
          </Stack>

          {/* ------------------------------------ Login ----------------------------- */}
          {loginOrRegister === "login" ? (
            <div className="loginContainer w-full">
              <ThemeProvider theme={newTheme}>
                <form className="w-full flex flex-col gap-6" onSubmit={(e) => handleSubmitLogin(e, valuesLogin, setErrorsLogin, setUser, setUserTokenFunc, navigate)}>
                  {/* Email */}
                  <div className="w-1/2">
                    <FormControl variant="standard" className="w-full">
                      <TextField
                        error={errorsLogin.email ? true : false}
                        autoFocus={true}
                        className="input-custom-outlined"
                        label="Email"
                        id="login-email"
                        name="email"
                        type="email"
                        required
                        placeholder="example@gmail.com"
                        value={valuesLogin.email}
                        onChange={handleChangeLogin}
                        autoComplete="email"
                      />
                      <FormHelperText>{errorsLogin.email && <label className="text-red-500">{errorsLogin.email}</label>}</FormHelperText>
                    </FormControl>
                  </div>

                  {/* Password */}
                  <div className="w-1/2">
                    <FormControl variant="standard" className="w-full">
                      <TextField
                        error={errorsLogin.password ? true : false}
                        label="Password"
                        className="input-custom-outlined"
                        id="login-password"
                        name="password"
                        autoComplete="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password..."
                        value={valuesLogin.password}
                        onChange={handleChangeLogin}
                        required
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
                                  {showPassword ? <Eye color="#3F4767"/> : <EyeClosed color="#3F4767"/>}
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      <FormHelperText> {errorsLogin.password && <label className="text-red-500">{errorsLogin.password}</label>}</FormHelperText>
                    </FormControl>
                  </div>

                  {/* Submit button */}
                  <p onClick={() => setLoginOrRegister("register")} className="text-quaternary w-fit cursor-pointer" >Don't have an account? <span className="text-primary">Click here</span></p>
                  <Link to="/forgot-password" className="text-quaternary w-fit">Forgot password? <span className="text-primary">Click here</span></Link>
                  <Button type="submit" sx={{ padding: 2 }} className="btn-filled-custom w-full" variant="contained" startIcon={<PaperPlaneRight />}>
                    Login
                  </Button>
                  {errorsLogin.general && <p className="errorBadge">{errorsLogin.general}</p>}
                </form>
              </ThemeProvider>
            </div>
          ) : (
            // ------------------------------------ Register ----------------------------->
            <div className="registerContainer">
              <form onSubmit={(e) => handleSubmitRegister(e, valuesRegister, setErrorsRegister)}>
                {/* Name */}
                <div>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="register-name">Name:</InputLabel>
                    <Input id="register-name" name="name" type="text" placeholder="Name..." value={valuesRegister.name} onChange={handleChangeRegister} required autoComplete="name" />
                    <FormHelperText>{errorsRegister.name && <label className="error">{errorsRegister.name}</label>}</FormHelperText>
                  </FormControl>
                </div>

                {/* Email */}
                <div>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="register-email">Email:</InputLabel>
                    <Input id="register-email" name="email" type="email" placeholder="example@gmail.com" value={valuesRegister.email} onChange={handleChangeRegister} required autoComplete="email" />
                    <FormHelperText>{errorsRegister.email && <label className="error">{errorsRegister.email}</label>}</FormHelperText>
                  </FormControl>
                </div>

                {/* Password */}
                <div>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="register-password">Password:</InputLabel>
                    <Input
                      id="register-password"
                      name="password"
                      autoComplete="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password..."
                      value={valuesRegister.password}
                      onChange={handleChangeRegister}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? "hide the password" : "display the password"}
                            onClick={togglePasswordVisibility}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            edge="end"
                          >
                            {showPassword ? <Eye /> : <EyeClosed />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>{errorsRegister.password && <label className="error">{errorsRegister.password}</label>}</FormHelperText>
                  </FormControl>
                </div>
                <div>
                  <Checkbox id="terms" name="terms" required />
                  <label htmlFor="terms">Accept terms and conditions:</label>
                </div>

                {/* Submit button */}
                <Button type="submit" variant="contained" endIcon={<PaperPlaneRight />}>
                  {" "}
                  Register{" "}
                </Button>
                {errorsRegister.general && (
                  <p className="error general">
                    <Info />
                    {errorsRegister.general}
                  </p>
                )}
              </form>
              <Link to="/login">Already have an account? Click here</Link>
            </div>
          )}
        </div>
        <div className="illustration overflow-hidden p-11" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <img src={userPanel} alt="userPanel" className="-z-20 tilt-image" ref={imageRef} />
        </div>
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
    </main>
  );
};

export default LoginRegister;
