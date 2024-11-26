import React, { useState } from "react";
import handleSubmitLogin from "./login.js";
import handleSubmitRegister from "./register.js";
import { Button, Checkbox, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import { Eye,EyeClosed, PaperPlaneRight, Info } from "@phosphor-icons/react";
import { usePasswordVisibility } from "../../hooks/passwordSwitch.jsx";
import Header from "../../components/layouts/Header.jsx";
import useUserStore from "../../stores/userStore.js";
import { useNavigate, useLocation, Link } from "react-router-dom";
import createHandleChange from "../../hooks/formHandlers.jsx";
import SmoothAlert from "../../components/common/SmoothAlert.jsx";

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

  // ? ------------------ Login and register component ------->
  return (
    <div>
      <Header></Header>
      {alertMessage && <SmoothAlert message={alertMessage} severity="error" />}

      {/* ------------------------------------ Login ----------------------------- */}
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmitLogin(e, valuesLogin, setErrorsLogin, setUser, setUserTokenFunc,navigate)}>
        {/* Email */}
        <div>
          <FormControl variant="standard">
            <InputLabel htmlFor="login-email">Email:</InputLabel>
            <Input id="login-email" name="email" type="email" placeholder="example@gmail.com" value={valuesLogin.email} onChange={handleChangeLogin} required autoComplete="email"/>
            <FormHelperText>{errorsLogin.email && <label className="error">{errorsLogin.email}</label>}</FormHelperText>
          </FormControl>
        </div>

        {/* Password */}
        <div>
          <FormControl variant="standard">
            <InputLabel htmlFor="login-password">Password:</InputLabel>
            <Input id="login-password" name="password"  type={showPassword ? 'text' : 'password'} label="Password" placeholder="Password..." value={valuesLogin.password} onChange={handleChangeLogin} required endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={togglePasswordVisibility}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  edge="end">
                  {showPassword ? <Eye/> : <EyeClosed/>}
                </IconButton>
              </InputAdornment>
            }/>
            <FormHelperText> {errorsLogin.password && <label className="error">{errorsLogin.password}</label>}</FormHelperText>
          </FormControl>
        </div>

        {/* Submit button */}
        <Button type="submit" variant="contained" endIcon={<PaperPlaneRight/>}> Login </Button>
        {errorsLogin.general && <p className="error general">{errorsLogin.general}</p>}
      </form>
      <Link to="/register">Don't have an account? Click here</Link>
      <Link to="/forgot-password">Forgot password?</Link>

      {/* ------------------------------------ Register ----------------------------- */}
      <h1>Register</h1>
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
            <Input id="register-email" name="email" type="email" placeholder="example@gmail.com" value={valuesRegister.email} onChange={handleChangeRegister} required autoComplete="email"/>
            <FormHelperText>{errorsRegister.email && <label className="error">{errorsRegister.email}</label>}</FormHelperText>
          </FormControl>
        </div>

        {/* Password */}
        <div>
          <FormControl variant="standard">
            <InputLabel htmlFor="register-password">Password:</InputLabel>
            <Input id="register-password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Password..." value={valuesRegister.password} onChange={handleChangeRegister} required endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={togglePasswordVisibility}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  edge="end">
                  {showPassword ? <Eye/> : <EyeClosed/>}
                </IconButton>
              </InputAdornment>
            }/>
            <FormHelperText>{errorsRegister.password && <label className="error">{errorsRegister.password}</label>}</FormHelperText>
          </FormControl>
        </div>
        <div>
          <Checkbox id="terms" name="terms" required />
          <label htmlFor="terms">Accept terms and conditions:</label>
        </div>

        {/* Submit button */}
        <Button type="submit" variant="contained" endIcon={<PaperPlaneRight/>}> Register </Button>
        {errorsRegister.general && <p className="error general"><Info/>{errorsRegister.general}</p>}
      </form>
      <Link to="/login">Already have an account? Click here</Link>
    </div>
  );
};

export default LoginRegister;
