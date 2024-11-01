import React from "react";
import { Link } from "react-router-dom";
import handleSubmitLogin from "./login"; //Handle the form and send the data to the server

//* ---------------> Login Component <---------------
const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmitLogin}>
        <div>
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="example@gmail.com" />
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." />
        </div>

        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Click here</Link>
      <Link to="/forgot-password">Forgot password?</Link>
    </div>
  );
};

export default Login;
