import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from "./Router.jsx";
import "./assets/styles/global.css";
import logo from "./assets/images/favicon.png";

const App = () => {
  useEffect(() => {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = logo;
    document.head.appendChild(favicon);
  }, []);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(<App />);
