import React from "react";
import { Link } from "react-router-dom";
import handleSubmitRegister from "./register";

//* ---------------> Register Component <---------------
const Register = () => {

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmitRegister}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" placeholder="Name..." />
        </div>
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
      <Link to="/login">Already have an account? Click here</Link>
    </div>
  );
};

export default Register;
