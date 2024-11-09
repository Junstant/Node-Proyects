import React from "react";
import { Link } from "react-router-dom";
import handleSubmitRegister from "./register";
import useForm from "../../Hooks/useForm.jsx";

//? --------> Register component
const Register = () => {
  //Valores iniciales de los campos
  const defaultFields = {
    name: "", 
    email: "", 
    password: "" 
};
  
//Custom hook para manejar los valores del formulario
  const { values, handleChange } = useForm(defaultFields);

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(e) => handleSubmitRegister(e, values)}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" placeholder="Name..." onChange={handleChange} />
        </div>
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

        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account? Click here</Link>
    </div>
  );
};

export default Register;
