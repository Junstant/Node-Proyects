import React from "react";
import useUserStore from "../../stores/userStore";
import { useLocation } from "react-router-dom";
import AppHeader from "../../components/layouts/AppHeader";
import { Avatar } from "@mui/material";
import SmoothAlert from "../../components/common/SmoothAlert";
import DeleteForm from "../../components/common/DeleteForm.jsx";
import UpdateForm from "../../components/common/UpadateForm.jsx";
import CareerManager from "../../components/common/Careers/CareerManager.jsx";
import "../../assets/styles/global.css";
import "../../assets/styles/userPanel.css";
import lightOne from "../../assets/images/lights/userPanel/lightOne.png";
import lightTwo from "../../assets/images/lights/userPanel/lightTwo.png";
import lightThree from "../../assets/images/lights/userPanel/lightThree.png";
import lightFour from "../../assets/images/lights/userPanel/lightFour.png";
import lightFive from "../../assets/images/lights/userPanel/lightFive.png";
import lightSix from "../../assets/images/lights/userPanel/lightSix.png";
// ? ------------------ UserPanel Logic ------->
const UserPanel = () => {
  const { user } = useUserStore();

  // # -> Location hook
  const location = useLocation();
  const alertMessage = location.state?.alertMessage || "";

  // ? ------------------ UserPanel Component ------->
  return (
    <div className="flex flex-row ParentResponsive">
      {/* Alert */}
      {alertMessage && <SmoothAlert message={alertMessage} severity="error" />}
      <AppHeader />
      {/* Main container */}
      <section className="heroUserPanel">
        {/* Left panel */}
        <section className="leftPanel">
          {/* Top panel */}
          <div className="topPanel">
            <div className="avatarContainer">
              <Avatar src="https://avatar.iran.liara.run/public/41" />
              <h1>{user.name}</h1>
            </div>
          </div>
          {/* Down panel */}
          <div className="downPanel">
            <h3>My personal information</h3>
            <div className="mt-6 w-full mb-4">
              <UpdateForm />
            </div>

            <h3>Delete account</h3>
            <div>
              <DeleteForm />
            </div>
          </div>
        </section>
        {/* Right panel */}
        <section className="rightPanel">
          <div className="w-full h-full overflow-y-scroll">
              <CareerManager />
          </div>
        </section>

        {/* Lights */}
        <section className="lights">
          <img src={lightOne} className="lightOne" alt="Light" />
          <img src={lightOne} className="lightOne" alt="Light" />
          <img src={lightTwo} className="lightTwo" alt="Light" />
          <img src={lightThree} className="lightThree" alt="Light" />
          <img src={lightFour} className="lightFour" alt="Light" />
          <img src={lightFive} className="lightFive" alt="Light" />
          <img src={lightSix} className="lightSix" alt="Light" />
          <img src={lightSix} className="lightSix" alt="Light" />
        </section>
      </section>
    </div>
  );
};

export default UserPanel;
