import React, { useState, useEffect } from "react";
import useUserStore from "../../../stores/userStore";
import handleCreateSchedule from "./Schedules/createSchedule";
import handleDeleteSchedule from "./Schedules/deleteSchedule";
import handleUpdateSchedule from "./Schedules/updateSchedule";
import getSchedules from "./Schedules/getSchedules";
import handleCreateAbsent from "./Absents/createAbsent";
import handleDeleteAbsent from "./Absents/deleteAbsent";
import handleUpdateAbsent from "./Absents/updateAbsent";
import getAbsents from "./Absents/getAbsents";
import { Button, Card, CardContent, Typography, Box, Chip } from "@mui/material";
import SmoothAlert from "../SmoothAlert";
import ModalPopUp from "../ModalPopUp";
import { Plus, Trash, Clock, MapPin, GraduationCap, ChartDonut, CalendarX, Medal, FlowArrow } from "@phosphor-icons/react";
import handleDeleteModule from "./deleteModule";

// ? ------------------ Module panel Logic ------->
const ModulePanel = () => {
  // # -> Get the active module and year
  const { modules, activeModule, activeYear, setModules, setActiveModule, setActiveYear } = useUserStore();

  // # -> Error states
  const [errorsModule, setErrorsModule] = useState({});

  // # -> Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ^ -----> Helper: Calculate average notes
  const calculateAverage = (notes) => (notes.length > 0 ? (notes.reduce((acc, note) => acc + note, 0) / notes.length).toFixed(1) : "0.0");

  // # -> Handle the modal open
  const handleOpen = () => setOpen(true);

  // ^ -----> Open the modal with content
  const handleOpenWithContent = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    handleOpen();
  };

  // ^ -----> Delete module
  const ModalDelete = async () => {
    if (activeModule) {
      await handleDeleteModule(setModules, setErrorsModule, activeModule._id, activeYear, modules, setActiveModule, setActiveYear, activeYear);
      setModalOpen(false);
    } else {
      setErrorsModule({ edit: "Please select a module to delete." });
    }
  };
  console.log(activeYear);
  console.log(activeModule);

  // ^ -----> Check if the active module is in the active year
  useEffect(() => {
    if (activeModule && activeYear && !activeYear.modules.some((module) => module === activeModule._id)) {
      if (activeModule !== null) {
        setActiveModule(null);
      }
    }
  }, [activeModule, activeYear]);

  // ? ------------------ Module panel Component ------->
  return (
    <Box>
      {/* Display the errors with the modal if there is an error*/}
      {errorsModule.edit && handleOpenWithContent("Error", <SmoothAlert severity="error" message={errorsModule.edit} />)}

      {/* --------------- Display Module ----------- */}
      {activeModule && activeYear && (
        <Card sx={{ border: `2px solid ${activeModule?.color || "#43A4FF"}`, borderRadius: "8px", padding: 2 }}>
          <CardContent>
            {/* Top part */}
            <div>
              {/* year and semester */}
              <div>
                <Box>{activeModule.period.year}</Box>
                <Box>{activeModule.period.semester}</Box>
              </div>

              {/* Average */}
              <div>
                <Box>
                  {activeModule.notes && calculateAverage(activeModule.notes)}
                  <Medal />
                </Box>
                {/* Delete module */}
                <Box>
                  <Button onClick={ModalDelete}>
                    <Trash />
                  </Button>
                </Box>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ModulePanel;
