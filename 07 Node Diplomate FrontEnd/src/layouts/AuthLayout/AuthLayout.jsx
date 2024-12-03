import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import verifySession from "./authLayout";
import Cursor from "../../components/layouts/Cursor";

// ? ------------------ Auth layout logic ------->
const AuthLayout = () => {
  const {userToken, setCareers, setUser, setUserTokenFunc, user, setActiveYear, setModules} = useUserStore();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (userToken) {
        // * -----> Verify the session
        try {
          await verifySession(setCareers ,setUser, setUserTokenFunc, userToken, user);
        } 
        // ! -----> If there is an error, log out the user
        catch (error) {
          console.error("Error verifying session:", error);
          setUser(null);
          setUserTokenFunc(null);
        }
      }
      setLoading(false);
    };

    verify();
  }, [userToken, setUser, setUserTokenFunc, setCareers, setModules, setActiveYear]);

  // Evitar renderizar componentes si estamos cargando o no hay usuario
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userToken || !user) {
    return <Navigate to="/login" state={{ from: location, alertMessage: "You must log in to access that page" }} replace />;
  }

  return (
    <div>
      <Cursor />
      <h1>Authenticated Layout</h1>
      <p>{user.name}</p>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
