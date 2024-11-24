import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import verifySession from "./authLayout";

// ? ------------------ Auth layout logic ------->
const AuthLayout = () => {
  const { userToken, setUser, setUserTokenFunc, user } = useUserStore();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (userToken) {
        try {
          await verifySession(setUser, setUserTokenFunc, userToken);
        } catch (error) {
          console.error("Error verifying session:", error);
          setUser(null);
          setUserTokenFunc(null);
        }
      }
      setLoading(false);
    };

    verify();
  }, [userToken, setUser, setUserTokenFunc]);

  // Evitar renderizar componentes si estamos cargando o no hay usuario
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userToken || !user) {
    return <Navigate to="/login" state={{ from: location, alertMessage: "You must log in to access that page" }} replace />;
  }

  return (
    <div>
      <h1>Authenticated Layout</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
