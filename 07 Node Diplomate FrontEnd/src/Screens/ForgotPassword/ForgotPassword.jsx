import React from "react";
import { Link } from "react-router-dom";
import handleSubmitForgotPassword from "./forgotPassword"; //Handle the form and send the data to the server

const ForgotPassword = () => {
  return (
    <div>
      <h1>Forgot password</h1>
      <form onSubmit={handleSubmitForgotPassword}>
        <div>
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="example@gmail.com" />
        </div>
        <button type="submit">Send reset email</button>
      </form>
      <Link to="/login">Already have account?</Link>
      <Link to="/register">Don't have an account?</Link>
    </div>
  );
};

export default ForgotPassword;
