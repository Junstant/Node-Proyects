import React from "react";
import useUserStore from "../../stores/userStore";
import AppHeader from "../../components/layouts/AppHeader";
import { CirclesFour } from "@phosphor-icons/react";
import { Avatar } from "@mui/material";
import CareerSwitcher from "../../components/common/careerSwitcher";
import CurrentTime from "../../components/common/ActualDate";
import ModulesManager from "../../components/common/Modules/ModulesManager.jsx";
import ModulePanel from "../../components/common/Modules/ModulePanel.jsx";
import "../../assets/styles/global.css";
import "../../assets/styles/modules.css";
import lightOne from "../../assets/images/lights/userPanel/lightOne.png";
import lightTwo from "../../assets/images/lights/userPanel/lightTwo.png";
import lightThree from "../../assets/images/lights/userPanel/lightThree.png";
import lightFour from "../../assets/images/lights/userPanel/lightFour.png";
import lightFive from "../../assets/images/lights/userPanel/lightFive.png";
import lightSix from "../../assets/images/lights/userPanel/lightSix.png";

// ? ------------------ Modules Logic ------->
const Modules = () => {
  const { activeYear, activeCareer } = useUserStore();

  // ? ------------------ Modules Component ------->
  return (
    <div className="flex flex-row ParentResponsive">
      <AppHeader />
      {/* Main container */}
      <section className="heroModules">
        <main className="leftContainer">
          {/* Top panel */}
          <section>
            <div>
              <CirclesFour /> Modules
            </div>
            <div>
              <Avatar alt="Avatar" src="https://picsum.photos/202" />
              <CareerSwitcher />
            </div>
            <div>
              <div>
                <CurrentTime />
              </div>
            </div>
          </section>
          {/* Modules */}
          <section>
            {!activeYear || !activeCareer ? (
              <div>Choose a career and year to see the modules</div>
            ) : (
              <div>
                <ModulesManager />
              </div>
            )}
          </section>
        </main>

        {/* Right panel */}
        <section>
          {!activeYear || !activeCareer ? (
            <div>Choose a career and year to see the module</div>
          ) : (
            <div>
              <ModulePanel />
            </div>
          )}
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

export default Modules;
