import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from "./Router.jsx";
import "./assets/styles/global.css";

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
