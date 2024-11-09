import React from "react";
import { Link } from "react-router-dom";
import handleSubmitForgotPassword from "./forgotPassword.js"; //Handle the form and send the data to the server
import useForm from "../../Hooks/useForm.jsx";

// ? --------> Forgot password component
const ForgotPassword = () => {

  const defaultFields = {
    email: "", 
  };  
  const { values, handleChange } = useForm(defaultFields);

  return (
    <div>
      <h1>Forgot password</h1>
      <form onSubmit={(e) => handleSubmitForgotPassword(e, values)}>
        <div>
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="example@gmail.com" onChange={handleChange} />
        </div>
        <button type="submit" >Send reset email</button>
      </form>
      <Link to="/login">Already have account?</Link>
      <Link to="/register">Don't have an account?</Link>
    </div>
  );
};

export default ForgotPassword;
