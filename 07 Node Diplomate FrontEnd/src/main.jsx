import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RouterProvider } from "react-router-dom";
import router from "./Router.jsx";

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
