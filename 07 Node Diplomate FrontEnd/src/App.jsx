import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
}

export default App;
