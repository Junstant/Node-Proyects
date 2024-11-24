import React, { useEffect } from "react";
import useUserStore from "../../stores/userStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import verifySession from "./authLayout";

// ? ------------------ Auth layout logic ------->
const AuthLayout = () => {
  const location = useLocation();

  //* --> Check if user is logged in
  const { userToken, setUser, setUserTokenFunc } = useUserStore();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserTokenFunc(token);
      verifySession(setUser, setUserTokenFunc, token, location.pathname);
    }
  }, [setUser, setUserTokenFunc, location.pathname]);

  if (!userToken) return <Navigate to="/" />;

  // ? ------------------ Auth layout component ------->
  return (
    <div>
      AuthLayout
      <Outlet />
    </div>
  );
};

export default AuthLayout;
