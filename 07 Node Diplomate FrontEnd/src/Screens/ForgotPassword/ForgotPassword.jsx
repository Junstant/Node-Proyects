import React, {useState} from "react";
import handleSubmitForgotPassword from "./forgotPassword.js";
import createHandleChange from "../../hooks/formHandlers.jsx";
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import Header from "../../components/layouts/Header.jsx";
import {Info} from "@phosphor-icons/react";


// ? --------> Forgot password component
const ForgotPassword = () => {

  // # -> States to manage form errors
  const [errors, setErrors] = useState({});

  // # -> States to manage form values
  const [values, setValues] = useState({ email: "" });

  // # -> Function to handle changes in the fields
  const handleChange = createHandleChange(setValues);

  // ? ------------------ Forgot password component ------->
  return (
    <div>
      <Header></Header>
      <h1>Forgot Password</h1>
      <form onSubmit={(e) => handleSubmitForgotPassword(e, values, setErrors)}>
        <FormControl variant="standard">
          <InputLabel htmlFor="email">Email:</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={values.email}
            required
            autoComplete="email"
            onChange={handleChange}
          />
          <FormHelperText>{errors.email && <label className="error">{errorsRegister.email}</label>}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained">Send email</Button>
        {errors.general && <p className="error general"><Info/>{errors.general}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
