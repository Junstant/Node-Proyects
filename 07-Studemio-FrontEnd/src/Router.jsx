import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout/AuthLayout.jsx";
import NoAuthLayout from "./layouts/NoAuthLayout/NoAuthLayout.jsx";
import Dashboard from "./Screens/Dashboard/Dashboard.jsx";
import UserPanel from "./Screens/UserPanel/UserPanel.jsx";
import Home from "./Screens/Home/Home.jsx";
import LoginRegister from "./Screens/LoginRegsiter/LoginRegister.jsx";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./Screens/ResetPassword/ResetPassword.jsx";
import Modules from "./Screens/Modules/Modules.jsx";
import VerifyEmail from "./Screens/VerifyEmail/VerifyEmail.jsx";

// ^ ------------------ Router ------------>
const router = createBrowserRouter([
  {
    // ? ------------------ Auth routes ------------>
    path: "/app",
    element: <AuthLayout/>,
    children: [
      {
        path: "",
        element: <Dashboard/>,
      },
      {
        path: "userPanel", 
        element: <UserPanel/>,
      },
      {
        path: "modules",
        element: <Modules/>,
      }
    ],
  },
  {
    // ? ------------------ No Auth routes ------------>
    path: "/",
    element: <NoAuthLayout/>,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "login",
        element: <LoginRegister/>,
      },
      {
        path: "register",
        element: <LoginRegister/>,
      },
      {
        path: "forgot-password", 
        element: <ForgotPassword/>,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword/>,
      },
      {
        path: "/verify/:token",
        element: <VerifyEmail/>,
      },
      {
        path: "*",
        element: <h1>Error 404</h1>,
      }
    ],
  },
]);

export default router;
