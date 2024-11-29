import React, { useState, useEffect } from "react";
import useUserStore from "../../../stores/userStore";
import handleDeleteModule from "./deleteModule";
import handleCreateSchedule from "./Schedules/createSchedule";
import handleDeleteSchedule from "./Schedules/deleteSchedule";
import { Button, Card, CardContent, Typography, Box, IconButton, Stack, Chip } from "@mui/material";
import { Trash, Medal, NotePencil, X, Plus, Clock, MapPin, GraduationCap, ChartDonut, CalendarDots } from "@phosphor-icons/react";
import ModalPopUp from "../ModalPopUp";
import ModalName from "./Modals/ModalName";
import ModalSchedule from "./Modals/ModalSchedule";
import ModalLocation from "./Modals/ModalLocation";
import ModalProfessor from "./Modals/ModalProfessor";
import Dependencies from "./Components/Dependencies";
import ModuleState from "./Components/ModuleState";
import ModuleAbsents from "./Components/ModuleAbsents";
import ModuleDetailsSelector from "./Components/ModulePeriod";
import ScheduleManager from "./Modals/ModalSchedule";

// ? ------------------ ModulePanel Logic ------->
const ModulePanel = () => {
  // # -> Get the active module and year
  const { modules, activeModule, activeYear, setModules, setActiveModule, setActiveYear } = useUserStore();

  // ? ------------------------------------- States -------------------------------------

  // # -> Error states
  const [errorsModule, setErrorsModule] = useState({});

  // # -> Modal states
  const [modalOpenDelete, setDeleteModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [modalLabels, setModalLabels] = useState({});
  const [iconCancel, setIconCancel] = useState(null);
  const [iconSubmit, setIconSubmit] = useState(null);
  const [submitAction, setSubmitAction] = useState(null);

  // # -> Handle the modal close and open
  const handleClose = () => setDeleteModalOpen(false);
  const handleOpen = () => setDeleteModalOpen(true);

  // # -> Name modal
  const [nameModal, nameModalOpen] = useState(false);

  // # -> Handle the modal close and open
  const handleCloseNameModal = () => nameModalOpen(false);
  const handleOpenNameModal = () => nameModalOpen(true);

  // # -> Schedule modal
  const [scheduleId, setScheduleId] = useState(null);
  const [triggerModal, setTriggerModal] = useState(false);

  // # -> Handle the modal close and open
  const handleOpenModal = (id) => {
    console.log(id);
    setScheduleId(id);
    setTriggerModal(true);
  };

  // # -> Location modal
  const [locationModal, setLocationModal] = useState(false);

  // # -> Handle the modal close and open
  const handleCloseLocationModal = () => setLocationModal(false);
  const handleOpenLocationModal = () => setLocationModal(true);

  // # -> Professor modal
  const [professorModal, setProfessorModal] = useState(false);

  // # -> Handle the modal close and open
  const handleCloseProfessorModal = () => setProfessorModal(false);
  const handleOpenProfessorModal = () => setProfessorModal(true);

  // ? ------------------------------------- Functions -------------------------------------

  // ^ -----> Helper: Calculate average notes
  const calculateAverage = (notes) => (notes.length > 0 ? (notes.reduce((acc, note) => acc + note, 0) / notes.length).toFixed(1) : "0.0");

  // ^ -----> Open the modal with content
  const handleOpenWithContent = (title, content, labels, iconCancel, iconSubmit, onSubmit = {}) => {
    setModalTitle(title);
    setModalContent(content);
    setModalLabels(labels);
    handleOpen();
    setIconCancel(iconCancel);
    setIconSubmit(iconSubmit);
    setSubmitAction(() => onSubmit);
  };

  // ^ -----> Delete module
  const ModalDelete = async () => {
    if (activeModule) {
      await handleDeleteModule(setModules, setErrorsModule, activeModule._id, activeYear, modules, setActiveModule, setActiveYear, activeYear);
      setDeleteModalOpen(false);
    } else {
      setErrorsModule({ edit: "Please select a module to delete." });
    }
  };

  // ^ -----> Open the delete confirmation modal
  const confirmDelete = () => {
    handleOpenWithContent(
      `Are you sure you want to delete "${activeModule.name}"?`,
      <>
        <Typography>Are you sure you want to delete this module? </Typography>
        <Typography>This action cannot be undone.</Typography>
      </>,
      { submitLabel: "Yes, Delete", cancelLabel: "No, Cancel" },
      <X />,
      <Trash />,
      ModalDelete
    );
  };

  // ^ -----> Open the edit name modal
  const confirmEditName = () => {
    handleOpenNameModal(true);
  };

  // ^ -----> Check if the active module is in the active year
  useEffect(() => {
    if (activeModule && activeYear && !activeYear.modules.some((module) => module === activeModule._id)) {
      if (activeModule !== null) {
        setActiveModule(null);
      }
    }
  }, [activeModule, activeYear]);

  console.log(modules);

  // ? ------------------ Module panel Component ------->
  return (
    <Box>
      {/* Display the errors with the modal if there is an error */}
      {errorsModule.edit && handleOpenWithContent("Error", <SmoothAlert severity="error" message={errorsModule.edit} />)}

      {/* --------------- Display Module ----------- */}
      {activeModule && activeYear && (
        <Card sx={{ border: 2, borderColor: activeModule.color, borderRadius: "8px", padding: 2 }}>
          <CardContent sx={{ spacing: 5, minHeight: 600, justifyContent: "space-around", display: "flex", flexDirection: "column" }}>
            {/* Top part */}
            <div>
              <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"space-between"}>
                {/* year and semester */}
                <div>
                  <Stack direction="row" spacing={1} alignItems={"center"}>
                    <Chip sx={{ background: activeModule.color }} label={activeModule.period.year} />
                    <Chip sx={{ background: activeModule.color }} label={activeModule.period.semester} />
                  </Stack>
                </div>

                {/* Average */}
                <div>
                  <Stack direction="row" spacing={1} alignItems={"center"}>
                    <Box>
                      {activeModule.notes && calculateAverage(activeModule.notes)}
                      <Medal />
                    </Box>
                    {/* Delete module */}
                    <Box>
                      <Button variant="outlined" sx={{ minWidth: "30px", height: "30px", padding: 0 }} onClick={confirmDelete}>
                        <Trash />
                      </Button>
                    </Box>
                  </Stack>
                </div>
              </Stack>
            </div>

            {/* Module name */}
            <div>
              <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems={"center"}>
                    <Typography sx={{ padding: 1, border: 2, borderColor: activeModule.color, borderRadius: 2, color: activeModule.color }} variant="h4">
                      {activeModule.index}
                    </Typography>
                    <Typography color={activeModule.color} variant="h4" onClick={confirmEditName}>
                      {activeModule.name}
                    </Typography>
                  </Stack>
                </Box>
                <IconButton sx={{ minWidth: "30px", height: "30px", padding: 0, margin: 0 }} onClick={confirmEditName}>
                  <NotePencil />
                </IconButton>
              </Stack>
            </div>

            {/* Schedule */}
            <div>
              <Box>
                <ScheduleManager />
              </Box>
            </div>

            {/* Location */}
            <div>
              <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems={"center"}>
                    <MapPin size={30} />
                    <Typography variant="h6">Location:</Typography>
                    <Typography variant="body2" onClick={handleOpenLocationModal}>
                      {activeModule.location}
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <IconButton sx={{ minWidth: "30px", height: "30px", padding: 0, margin: 0 }} onClick={handleOpenLocationModal}>
                    <NotePencil />
                  </IconButton>
                </Box>
              </Stack>
            </div>

            {/* professor */}
            <div>
              <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Stack direction="row" spacing={1} alignItems={"center"}>
                  <GraduationCap size={30} />
                  <Typography variant="h6">Professor:</Typography>
                  <Typography variant="body2" onClick={handleOpenProfessorModal}>
                    {activeModule.professor}
                  </Typography>
                </Stack>
                <Box alignItems="center">
                  <IconButton sx={{ minWidth: "30px", height: "30px", padding: 0, margin: 0 }} onClick={handleOpenProfessorModal}>
                    <NotePencil/>
                  </IconButton>
                </Box>
              </Stack>
            </div>

            {/* Dependencies */}
            <div>
              <Box>
                <Dependencies />
              </Box>
            </div>

            {/* State */}
            <div>
              <Box>
                <Stack direction="row" spacing={1} alignItems={"center"}>
                  <ChartDonut size={30}/>
                  <Typography variant="h6">State:</Typography>
                  <ModuleState />
                </Stack>
              </Box>
            </div>

            {/* Absences */}
            <div>
              <Box>
                <ModuleAbsents />
              </Box>
            </div>

            {/* Period */}
            <div>
              <Box>
                <Stack direction="row" spacing={1} alignItems={"center"} marginTop={2}>
                  <CalendarDots size={30}/>
                  <Typography variant="h6">Period:</Typography> 
                <ModuleDetailsSelector />
                </Stack>
              </Box>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <ModalPopUp
        open={modalOpenDelete}
        handleClose={handleClose}
        title={modalTitle}
        onSubmit={submitAction}
        submitLabel={modalLabels.submitLabel}
        cancelLabel={modalLabels.cancelLabel}
        cancelIcon={iconCancel}
        submitIcon={iconSubmit}
      >
        {modalContent}
      </ModalPopUp>

      {/* Name modal */}
      {activeModule && <ModalName open={nameModal} handleClose={handleCloseNameModal} />}

      {/* Location modal */}
      {activeModule && <ModalLocation open={locationModal} handleClose={handleCloseLocationModal} />}

      {/* Professor modal */}
      {activeModule && <ModalProfessor open={professorModal} handleClose={handleCloseProfessorModal} />}
    </Box>
  );
};

export default ModulePanel;
