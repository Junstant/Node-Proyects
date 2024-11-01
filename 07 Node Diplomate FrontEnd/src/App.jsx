import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login/Login.jsx";
import Register from "./Screens/Register/Register.jsx";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./Screens/ResetPassword/ResetPassword.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:reset-token" element={<ResetPassword/>} /> 
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
