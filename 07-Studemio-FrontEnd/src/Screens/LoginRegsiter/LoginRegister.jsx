import React, { useState, useRef } from "react";
import handleSubmitLogin from "./login.js";
import handleSubmitRegister from "./register.js";
import { Button, Checkbox, FormControl, FormHelperText, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { Eye, EyeClosed, PaperPlaneRight, Warning } from "@phosphor-icons/react";
import usePasswordVisibility from "../../hooks/PasswordSwitch.jsx";
import Header from "../../components/layouts/Header.jsx";
import useUserStore from "../../stores/userStore.js";
import { useNavigate, useLocation, Link } from "react-router-dom";
import createHandleChange from "../../hooks/FormHandlers.jsx";
import SmoothAlert from "../../components/common/SmoothAlert.jsx";
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
import "../../assets/styles/loginRegister.css";
import newTheme from "../../assets/styles/Theme.jsx";

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
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * -5;

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
          <Stack direction="row" className="titlesSwitch" spacing={5}>
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
                  <div className="w-3/4">
                    <FormControl variant="standard" className="w-full">
                      <TextField
                        slotProps={{ borderRadius: 2 }}
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
                  <div className="w-3/4">
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
                                  {showPassword ? <Eye color="#3F4767" /> : <EyeClosed color="#3F4767" />}
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
                  <p onClick={() => setLoginOrRegister("register")} className="text-quaternary w-fit cursor-pointer">
                    Don't have an account? <span className="text-primary">Click here</span>
                  </p>
                  <Link to="/forgot-password" className="text-quaternary w-fit">
                    Forgot password? <span className="text-primary">Click here</span>
                  </Link>
                  <Button type="submit" sx={{ padding: 2 }} className="btn-filled-custom w-full" variant="contained" startIcon={<PaperPlaneRight />}>
                    Login
                  </Button>
                  {errorsLogin.general && (
                    <p className="errorBadge">
                      <Warning />
                      {errorsLogin.general}
                    </p>
                  )}
                </form>
              </ThemeProvider>
            </div>
          ) : (
            // ------------------------------------ Register ----------------------------->
            <div className="registerContainer w-full">
              <ThemeProvider theme={newTheme}>
                <form className="w-full flex flex-col gap-6 " onSubmit={(e) => handleSubmitRegister(e, valuesRegister, setErrorsRegister)}>
                  {/* Name */}
                  <p className="text-quaternary mt-5">Passwords must be at least 8 characters, one letter, one number and one special character.</p>{" "}
                  <div className="w-3/4">
                    <FormControl variant="standard" className="w-full">
                      <TextField
                        autoFocus={true}
                        error={errorsRegister.name ? true : false}
                        label="Name"
                        id="register-name"
                        name="name"
                        type="text"
                        placeholder="Name..."
                        value={valuesRegister.name}
                        onChange={handleChangeRegister}
                        required
                        autoComplete="name"
                      />
                      <FormHelperText>{errorsRegister.name && <label className="text-red-500">{errorsRegister.name}</label>}</FormHelperText>
                    </FormControl>
                  </div>
                  {/* Email */}
                  <div className="w-3/4">
                    <FormControl variant="standard" className="w-full">
                      <TextField
                        error={errorsRegister.email ? true : false}
                        label="Email"
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={valuesRegister.email}
                        onChange={handleChangeRegister}
                        autoComplete="email"
                      />
                      <FormHelperText>{errorsRegister.email && <label className="text-red-500">{errorsRegister.email}</label>}</FormHelperText>
                    </FormControl>
                  </div>
                  {/* Password */}
                  <div className="w-3/4">
                    <FormControl variant="standard" className="w-full">
                      <TextField
                        error={errorsRegister.password ? true : false}
                        label="Password"
                        id="register-password"
                        name="password"
                        autoComplete="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password..."
                        value={valuesRegister.password}
                        onChange={handleChangeRegister}
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
                                  {showPassword ? <Eye color="#3F4767" /> : <EyeClosed color="#3F4767" />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      <FormHelperText>{errorsRegister.password && <label className="text-red-500">{errorsRegister.password}</label>}</FormHelperText>
                    </FormControl>
                  </div>
                  <div>
                    <Checkbox id="terms" name="terms" required sx={{ color: "#FFFFFF" }} />
                    <label htmlFor="terms" className="font-light">
                      I agree the <span className="text-primary cursor-pointer">terms and conditions</span>
                    </label>
                  </div>
                  <p onClick={() => setLoginOrRegister("login")} className="text-quaternary">
                    Already have an account? <span className="cursor-pointer text-primary">Click here</span>
                  </p>
                  {/* Submit button */}
                  <Button sx={{ padding: 2 }} className="btn-filled-custom w-full" type="submit" variant="contained" startIcon={<PaperPlaneRight />}>
                    Register
                  </Button>
                {errorsRegister.general && (
                  <p className="errorBadge">
                    <Warning />
                    {errorsRegister.general}
                  </p>
                )}
                </form>
              </ThemeProvider>
            </div>
          )}
        </div>
        <div className="illustration overflow-hidden p-11" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <img src={userPanel} alt="userPanel" className="tilt-image" ref={imageRef} />
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
