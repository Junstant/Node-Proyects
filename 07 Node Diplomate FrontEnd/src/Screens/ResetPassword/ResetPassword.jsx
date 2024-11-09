import React from "react";
import { useParams } from "react-router-dom";
import handleSubmitResetPassword from "./resetPassword"; //Handle the form and send the data to the server
import useForm from "../../Hooks/useForm.jsx";

// ? --------> Reset password component
const ResetPassword = () => {

  //Valores iniciales de los campos
  const defaultFields = {
    password: "",
    confirmPassword: "",
  };
  //:: Extract the token from the URL
  const { token } = useParams();

  //Custom hook para manejar los valores del formulario
  const { values, handleChange } = useForm(defaultFields);


  return (
    <div>
      <h1>Reset password</h1>
      <form onSubmit={(e) => handleSubmitResetPassword(e, token, values)}>
        <div>
          {/* Password */}
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." onChange={handleChange}/>
          {/* Password confirm */}
          <label htmlFor="confirmPassword">Repeat the password</label>
          <input type="password" name="confirmPassword" placeholder="Repeat the password..." onChange={handleChange}/>
        </div>
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
