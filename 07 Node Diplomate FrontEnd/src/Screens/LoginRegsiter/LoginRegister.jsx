import React from "react";
import { Link } from "react-router-dom";
import handleSubmitLogin from "./login.js"; //Handle the form and send the data to the server
import handleSubmitRegister from "./register.js";
import useForm from "../../Hooks/useForm.jsx";

// ? --------> Login-Register component
const LoginRegister = () => {
  //Valores iniciales de los campos de login
  const defaultFieldsLogin = {
    email: "",
    password: "",
  };
  //Valores iniciales de los campos de registro
  const defaultFieldsRegister = {
    name: "",
    email: "",
    password: "",
  };

  //Custom hook para manejar los valores del formulario de login
  const { valuesLogin, handleChangeLogin } = useForm(defaultFieldsLogin);

  //Custom hook para manejar los valores del formulario de registro
  const { valuesRegister, handleChangeRegister } = useForm(defaultFieldsRegister);

  return (
    <div>
      {/* ------------------- Login ---------------- */}
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmitLogin(e, valuesLogin)}>
        <div>
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="example@gmail.com" onChange={handleChangeLogin} />
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." onChange={handleChangeLogin} />
        </div>

        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Click here</Link>
      <Link to="/forgot-password">Forgot password?</Link>

      {/* ------------------ Register --------------- */}
      <h1>Register</h1>
      <form onSubmit={(e) => handleSubmitRegister(e, valuesRegister)}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" placeholder="Name..." onChange={handleChangeRegister} />
        </div>
        <div>
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="example@gmail.com" onChange={handleChangeRegister} />
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." onChange={handleChangeRegister} />
        </div>

        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account? Click here</Link>
    </div>
  );
};

export default LoginRegister;
