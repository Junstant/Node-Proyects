import React from "react";
import useUserStore from "../../stores/userStore";
import AppHeader from "../../components/layouts/AppHeader";
import { CirclesFour } from "@phosphor-icons/react";
import { Avatar } from "@mui/material";
import CareerSwitcher from "../../components/common/careerSwitcher";
import CurrentTime from "../../components/common/ActualDate";
import ModulesManager from "../../components/common/Modules/ModulesManager.jsx";
import ModulePanel from "../../components/common/Modules/ModulePanel.jsx";

// ? ------------------ Modules Logic ------->
const Modules = () => {
  const { activeYear, activeCareer } = useUserStore();

  // ? ------------------ Modules Component ------->
  return (
    <div>
      <AppHeader />
      {/* Left panel */}
      <section>
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

        {/* Right panel */}
        <div>
        {!activeYear || !activeCareer ? (
            <div>Choose a career and year to see the module</div>
          ) : (
            <div>
              <ModulePanel />
            </div>
          )}
        </div>

      </section>
    </div>
  );
};

export default Modules;