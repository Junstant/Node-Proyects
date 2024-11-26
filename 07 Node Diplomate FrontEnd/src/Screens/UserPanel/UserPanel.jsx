import React, { useState } from "react";
import useUserStore from "../../stores/userStore";
import { useLocation } from "react-router-dom";
import AppHeader from "../../components/layouts/AppHeader";
import { Avatar } from "@mui/material";
import SmoothAlert from "../../components/common/SmoothAlert";
import DeleteForm from "../../components/common/DeleteForm.jsx";
import UpdateForm from "../../components/common/UpadateForm.jsx";
import CareerManager from "../../components/common/Careers/CareerManager.jsx";

// ? ------------------ UserPanel Logic ------->
const UserPanel = () => {
  const { user } = useUserStore();

  // # -> Location hook
  const location = useLocation();
  const alertMessage = location.state?.alertMessage || "";

  // ? ------------------ UserPanel Component ------->
  return (
    <div>
      <AppHeader />
      {/* Alert */}
      {alertMessage && <SmoothAlert message={alertMessage} severity="error" />}
      <div>
        {/* Left panel */}
        <section>
          {/* Top panel */}
          <div>
            <Avatar src="https://avatar.iran.liara.run/public/41" />
            <h1>{user.name}</h1>
          </div>
          {/* Down panel */}
          <div>
            <h3>My personal information</h3>
            <div>
              <UpdateForm />
            </div>

            <h3>Delete account</h3>
            <div>
              <DeleteForm />
            </div>
          </div>
        </section>
        {/* Right panel */}
        <section>
          <div>
            <div>
              <h3>Career</h3>
              <CareerManager />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPanel;
