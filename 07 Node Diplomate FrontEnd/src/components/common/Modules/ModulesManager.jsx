import React, { useState, useEffect } from "react";
import useUserStore from "../../../stores/userStore";
import handleCreateModule from "./createModule";
import { Button, Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Plus, Clock, MapPin, GraduationCap, ChartDonut, CalendarX, Medal, FlowArrow } from "@phosphor-icons/react";
import SmoothAlert from "../SmoothAlert";
import getModules from "./getModules";

const ModulesManager = () => {
  //# --> Get user
  const { modules = [], setModules, activeYear, setActiveModule, setActiveYear } = useUserStore();

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

  return (
    <Box>
      {/* Display the errors */}
      {errorsModule.edit && <SmoothAlert severity="error" message={errorsModule.edit} />}

      {/* --------------- Create Module ----------- */}
      <h4>My modules</h4>
      <Button onClick={() => handleCreateModule(setModules, setErrorsModule, activeYear, modules, setActiveYear)}>
        <Plus />
      </Button>

      {/* --------------- Display Modules ----------- */}
      <Box sx={{ marginTop: 2 }}>
        {modules.map((module, index) => (
          <Card
            onClick={() => handleModuleClick(module, index)}
            key={module._id}
            sx={{ marginBottom: 2, padding: 2, borderRadius: "8px", backgroundColor: "#1e1e2f", border: `2px solid ${module.color || "#43A4FF"}` }}
          >
            <CardContent>
              {/* Header */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <div style={{ width: "40px", height: "40px", backgroundColor: module.color, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h6" color="#000">
                      {index + 1}
                    </Typography>
                  </div>
                  <Typography variant="h6" color="#fff">
                    {module.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" color="#fff">
                    {calculateAverage(module.notes)}
                  </Typography>
                  <Medal size={24} color="#fff" />
                </Box>
              </Box>

              {/* Schedule */}
              <Box sx={{ display: "flex", alignItems: "top", marginTop: 2, gap: 1 }}>
                <Clock size={24} color="#fff" />
                {module.schedule.length > 0 ? (
                  <Box>
                    {module.schedule.map((sch, i) =>
                      sch.days.map((day,j ) => (
                          <Typography key={`${i}-${j}`} variant="body2" color="#fff">
                            {`${day.fromHr} - ${day.toHr} ${day.name.substring(0, 3)}`}
                          </Typography>
                        )
                      )
                    )}
                  </Box>
                ) : (
                  <Typography variant="body2" color="#fff">
                    Your schedule
                  </Typography>
                )}
              </Box>

              {/* Location */}
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 1, gap: 1 }}>
                <MapPin size={24} color="#fff" />
                <Typography variant="body2" color="#fff">
                  {module.location}
                </Typography>
              </Box>

              {/* Professor */}
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 1, gap: 1 }}>
                <GraduationCap size={24} color="#fff" />
                <Typography variant="body2" color="#fff">
                  {module.professor}
                </Typography>
              </Box>

              {/* Dependencies */}
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 1, gap: 1 }}>
                <FlowArrow size={24} color="#fff" />
                {module.dependencies.length > 0 ? (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {module.dependencies.map((dep, i) => (
                      <Chip key={dep._id} label={dep.name} variant="outlined" size="small" sx={{border: 2, borderColor: dep.color, color: dep.color}} />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="#fff">
                    No hay dependencias
                  </Typography>
                )}
              </Box>

              {/* State */}
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 1, gap: 1 }}>
                <ChartDonut size={24} color="#fff" />
                <Typography variant="body2" color="#fff">
                  {module.state}
                </Typography>
              </Box>

              {/* Absences and Period */}
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarX size={24} color="#fff" />
                  <Typography variant="body2" color="#fff">
                    Faltas: {module.absents.length || 0}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip label={module.period.year} sx={{background:module.color}} color="secondary" size="small" />
                  <Chip label={module.period.semester} sx={{background:module.color}} color="secondary" size="small" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ModulesManager;
