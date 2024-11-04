import React from "react";
import { useParams } from "react-router-dom";
import handleSubmitResetPassword from "./resetPassword"; //Handle the form and send the data to the server


const ResetPassword = () => {

//:: Extract the token from the URL
  const { token } = useParams();

  return (
    <div>
      <h1>Reset password</h1>
      <form onSubmit={(e) => handleSubmitResetPassword(e, token)}>
        <div>
          {/* Password */}
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." />
          {/* Password confirm */}
          <label htmlFor="confirmPassword">Repeat the password</label>
          <input type="password" name="confirmPassword" placeholder="Repeat the password..." />
        </div>
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
