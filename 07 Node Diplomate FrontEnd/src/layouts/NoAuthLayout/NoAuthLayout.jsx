import React, { useEffect } from "react";
import useUserStore from "../../stores/userStore";
import { Navigate, Outlet } from "react-router-dom";
import "../../assets/styles/global.css";
import Cursor from "../../components/layouts/Cursor";

// ? ------------------ NoAuth layout logic ------->
const NoAuthLayout = () => {
  const { userToken, setUserTokenFunc } = useUserStore();

  // * ---> Check if user is logged in
  useEffect(() => {
    if (userToken) {
      setUserTokenFunc(userToken);
    }
  }, []);
  if (userToken) return <Navigate to="/app" />;
  

  // ? ------------------ NoAuth layout component ------->
  return (
    <div>
      <Cursor />
      <Outlet />
    </div>
  );
};

export default NoAuthLayout;
