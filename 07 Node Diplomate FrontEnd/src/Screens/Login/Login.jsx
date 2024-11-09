import React from "react";
import { Link } from "react-router-dom";
import handleSubmitLogin from "./login"; //Handle the form and send the data to the server
import useForm from "../../Hooks/useForm.jsx";

// ? --------> Login component
const Login = () => {
  //Valores iniciales de los campos
  const defaultFields = {
    email: "", 
    password: "" 
};

 //Custom hook para manejar los valores del formulario
 const { values, handleChange } = useForm(defaultFields);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmitLogin(e, values)}>
        <div>
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="example@gmail.com" onChange={handleChange} />
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." onChange={handleChange} />
        </div>

        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Click here</Link>
      <Link to="/forgot-password">Forgot password?</Link>
    </div>
  );
};

export default Login;
