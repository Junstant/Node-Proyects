import React, { useEffect } from "react";
import useUserStore from "../../stores/userStore";
import { Navigate, Outlet } from "react-router-dom";

// ? ------------------ NoAuth layout logic ------->
const NoAuthLayout = () => {
  const { userToken, setUserTokenFunc } = useUserStore();

  // * ---> Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserTokenFunc(token);
    }
  }, [setUserTokenFunc]);

  if (userToken) return <Navigate to="/dashboard" />;

  // ? ------------------ NoAuth layout component ------->
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NoAuthLayout;
