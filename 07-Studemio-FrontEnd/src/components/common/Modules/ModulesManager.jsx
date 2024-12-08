import React, { useState, useEffect } from "react";
import useUserStore from "../../../stores/userStore.js";
import handleCreateModule from "./createModule.js";
import { Button, Typography, Box, Chip, Tooltip } from "@mui/material";
import { Plus, Clock, MapPin, GraduationCap, ChartDonut, CalendarX, Medal, FlowArrow } from "@phosphor-icons/react";
import SmoothAlert from "../SmoothAlert.jsx";
import getModules from "./getModules.js";
import "../../../assets/styles/modulesCard.css";
import "../../../assets/styles/global.css";
import themeNew from "../../../assets/styles/Theme.jsx";
import { ThemeProvider } from "@mui/material/styles";

const ModulesManager = () => {
  //# --> Get user
  const { modules = [], setModules, activeYear, setActiveModule, setActiveYear, setActiveCareer, activeCareer} = useUserStore();

  //# --> Error states
  const [errorsModule, setErrorsModule] = useState({});

  // ^ -----> Helper: Calculate average notes
  const calculateAverage = (notes) => (notes.length > 0 ? (notes.reduce((acc, note) => acc + note, 0) / notes.length).toFixed(1) : "0.0");

  // # -----> UseEffect to load the modules when the component is mounted
  useEffect(() => {
    getModules(setModules, activeYear);
  }, [activeYear, setModules]);

  // ^ -----> Hanlder: Click on module
  const handleModuleClick = (module, i) => {
    const updateModule = {
      ...module,
      index: (i + 1).toString().padStart(2, "0"),
    };
    setActiveModule(updateModule);
  };

  console.log(modules);

  // ^ -----> Convert hex to rgba
  function hexToRgba(hex, alpha) {
    // Elimina el símbolo '#' si está presente
    const cleanHex = hex.replace("#", "");

    // Divide el color en componentes RGB
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // Devuelve el formato rgba
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <section className="heroModulesManager h-full">
      {/* Display the errors */}
      {errorsModule.edit && <SmoothAlert severity="error" message={errorsModule.edit} />}
      <ThemeProvider theme={themeNew}>
        {/* --------------- Create Module ----------- */}
        <div className="w-full flex flex-row justify-between items-center px-6 max-xl:px-6">
          <h4>My modules</h4>
          <Tooltip title="Create a new module">
            <Button className="clickMini" onClick={() => handleCreateModule(setModules, setErrorsModule, activeYear, modules, setActiveYear, setActiveCareer, activeCareer)}>
              <Plus />
            </Button>
          </Tooltip>
        </div>

        {/* --------------- Display Modules ----------- */}
        <section className="modulesBox">
          {modules.map((module, index) => (
            <div onClick={() => handleModuleClick(module, index)} key={module._id} className="cardModule cursor-pointer" style={{ border: `1px solid ${module.color || "#43A4FF"}` }}>
              <div className="w-full flex flex-col justify-between">
          
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Module number */}
                      <div className="w-9 h-9 min-h9 min-w-9 rounded-md flex items-center justify-center" style={{ backgroundColor: module.color, boxShadow: `0px 0px 30px ${hexToRgba(module.color, 0.7)}` }}>
                        <Typography className="text-xl text-backgroundT">{(index + 1).toString().padStart(2, "0")}</Typography>
                      </div>

                      {/* Module name */}
                      <h6 style={{ color: module.color }} className="text-sm font-medium break-all">
                        {module.name}
                      </h6>
                    </div>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="h6" color={module.color}>
                        {calculateAverage(module.notes)}
                      </Typography>
                      <Medal size={24} color={module.color} />
                    </Box>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-start mt-4 gap-2">
                    <Clock size={18} color="#fff" />
                    {module.schedule.length > 0 ? (
                      <Box>
                        {module.schedule.slice(0, 3).map((sch, i) =>
                          sch.days.map((day, j) => (
                            <Typography key={`${i}-${j}`} variant="body2" color="#fff">
                              {`${day.fromHr} - ${day.toHr} ${day.name.substring(0, 3)}`}
                            </Typography>
                          ))
                        )}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="#fff">
                        Your schedule
                      </Typography>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center mt-2 gap-2">
                    <MapPin size={18} color="#fff" />
                    <Typography variant="body2" color="#fff">
                      {module.location}
                    </Typography>
                  </div>

                  {/* Professor */}
                  <div className="flex items-center mt-2 gap-2">
                    <GraduationCap size={18} color="#fff" />
                    <Typography variant="body2" color="#fff">
                      {module.professor}
                    </Typography>
                  </div>

                  {/* State */}
                  <div className="flex items-center mt-2 gap-2">
                    <ChartDonut size={18} color="#fff" />
                    <Typography variant="body2" color="#fff">
                      {module.state}
                    </Typography>
                  </div>

                  {/* Dependencies */}
                  <div className="flex items-center my-2 overflow-hidden">
                    <div className="flex flex-row items-center max-h-14 gap-x-2 justify-start w-full max-w-full">
                      <FlowArrow size={18} color="#ffffff" />
                      {module.dependencies.length > 0 ? (
                        <div className="flex w-full h-fit flex-wrap gap-x-2">
                          {module.dependencies.slice(0, 3).map((dep, i) => (
                            <Chip key={dep._id} label={dep.name} variant="outlined" size="small" sx={{ border: 1, borderColor: dep.color, color: dep.color, fontSize:"10px" }} />
                          ))}
                          ...
                        </div>
                      ) : (
                        <Typography variant="body2" color="#fff">
                          There are no dependencies
                        </Typography>
                      )}{" "}
                    </div>
                  </div>
                </div>

                {/* Absences and Period */}
                <div className="flex items-center justify-between mt-auto gap-2">
                  <Tooltip title="Absences" placement="bottom">
                    <div className="flex flex-row items-center gap-2">
                      <CalendarX size={24} color={module.color} />
                      <Typography variant="body2" color={module.color}>
                        {module.absents.length || 0}
                      </Typography>
                    </div>
                  </Tooltip>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Chip style={{ boxShadow: `0px 0px 30px ${hexToRgba(module.color, 0.7)}` }} label={module.period.year} sx={{ background: module.color, color: "#23293f" }} size="small" />
                    <Chip style={{ boxShadow: `0px 0px 30px ${hexToRgba(module.color, 0.7)}` }} label={module.period.semester} sx={{ background: module.color, color: "#23293f" }} size="small" />
                  </Box>
                </div>
       
            </div>
          ))}
        </section>
      </ThemeProvider>
    </section>
  );
};

export default ModulesManager;
