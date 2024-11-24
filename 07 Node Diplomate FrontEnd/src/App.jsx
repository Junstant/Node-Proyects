import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home/Home";
import LoginRegister from "./Screens/LoginRegsiter/LoginRegister.jsx";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./Screens/ResetPassword/ResetPassword.jsx";
import UserPanel from "./Screens/UserPanel/UserPanel.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginRegister/>} />
        <Route path="/register" element={<LoginRegister/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} /> 
        <Route path="/:user" element={<UserPanel/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
