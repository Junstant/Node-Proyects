import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
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

        <button type="submit">Register</button>
      </form>
      <Link to="/register">Don't have an account? Click here</Link>
    </div>
  );
};

export default Login;
