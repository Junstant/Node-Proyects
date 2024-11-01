import React from "react";
import handleSubmitResetPassword from "./resetPassword"; //Handle the form and send the data to the server

const ResetPassword = () => {
  return (
    <div>
      <h1>Reset password</h1>
      <form onSubmit={handleSubmitResetPassword}>
        <div>
          {/* Password */}
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." />
          {/* Password confirm */}
          <label htmlFor="passwordConfirm">Repeat the password</label>
          <input type="password" name="passwordConfirm" placeholder="Repeat the password..." />
        </div>
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
