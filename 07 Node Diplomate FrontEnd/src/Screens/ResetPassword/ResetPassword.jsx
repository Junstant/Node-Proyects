import React, { useState } from "react";
import handleSubmitResetPassword from "./resetPassword.js";
import createHandleChange from "../../hooks/formHandlers.jsx";
import { Button, FormControl, FormHelperText, Input, InputAdornment, InputLabel, IconButton } from "@mui/material";
import Header from "../../components/layouts/Header.jsx";
import { Info } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { usePasswordVisibility } from "../../hooks/passwordSwitch.jsx";

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

  // ? ------------------ Reset password component ------->
  return (
    <div>
      <Header></Header>
      <h1>Reset Password</h1>
      <form onSubmit={(e) => handleSubmitResetPassword(e, values, setErrors, token)}>
        {/* Password */}
        <div>
          <FormControl variant="standard">
            <InputLabel htmlFor="password">Password:</InputLabel>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={values.password}
              required
              autoComplete="new-password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} edge="end">
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{errors.password && <label className="error">{errors.password}</label>}</FormHelperText>
          </FormControl>
        </div>
        {/* Confirm Password */}
        <div>
          <FormControl variant="standard">
            <InputLabel htmlFor="confirmPassword">Confirm Password:</InputLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={values.confirmPassword}
              required
              autoComplete="new-password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} edge="end">
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{errors.confirmPassword && <label className="error">{errors.confirmPassword}</label>}</FormHelperText>
          </FormControl>
        </div>
        <Button type="submit" variant="contained">
          Reset Password
        </Button>
        {errors.general && (
          <p className="error general">
            <Info />
            {errors.general}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
