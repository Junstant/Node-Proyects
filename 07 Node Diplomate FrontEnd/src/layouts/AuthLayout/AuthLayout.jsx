import React, { useEffect } from "react";
import useUserStore from "../../stores/userStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import verifySession from "./authLayout";

// ? ------------------ Auth layout logic ------->
const AuthLayout = () => {
  const location = useLocation();
  const { userToken, setUser, setUserTokenFunc } = useUserStore();

  //* --> Check if user is logged in and verify the session
  useEffect(() => {
    if (userToken) {
      verifySession(setUser, setUserTokenFunc, userToken, location.pathname);
    }
  }, []);

  // ! --> Redirect to login if the user is not authenticated
  if (!userToken) {
    return <Navigate to="/login" state={{ from: location, alertMessage: "You must log in to acces that page" }} replace />;
  }

  return (
    <div>
      <h1>Authenticated Layout</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
