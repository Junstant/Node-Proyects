import React, { useState, useEffect } from "react";
import useUserStore from "../../../stores/userStore";
import handleDeleteModule from "./deleteModule";
import handleCreateSchedule from "./Schedules/createSchedule";
import { Button, Card, CardContent, Typography, Box, IconButton, FormControl, FormHelperText, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Trash, Medal, NotePencil, X, Plus, Clock } from "@phosphor-icons/react";
import ModalPopUp from "../ModalPopUp";
import ModalName from "./Modals/ModalName";
import ModalSchedule from "./Modals/ModalSchedule";

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

  // # -> Modal states
  const [scheduleModal, setScheduleModal] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  //# -> Handle the modal close and open
  const handleModalOpen = (id) => {
    setSelectedScheduleId(id);
    setScheduleModal(true);
  };

  //# -> Handle the modal close and open
  const handleModalClose = () => {
    setSelectedScheduleId(null);
    setScheduleModal(false);
  };

  console.log(modules);

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

  // ^ -----> Create schedule
  const createSchedule = async () => {
    if (activeModule) {
      await handleCreateSchedule(setModules, setErrorsModule, setActiveModule, modules, activeModule);
    } else {
      setErrorsModule({ edit: "Please select a module to create a schedule." });
    }
  };

  // ? ------------------ Module panel Component ------->
  return (
    <Box>
      {/* Display the errors with the modal if there is an error */}
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
                  <Button onClick={confirmDelete}>
                    <Trash />
                  </Button>
                </Box>
              </div>
            </div>

            {/* Module name */}
            <div>
              <Box>
                <Typography variant="h4">{activeModule.index}</Typography>
                <Typography variant="h4">{activeModule.name}</Typography>
              </Box>
              <IconButton onClick={confirmEditName}>
                <NotePencil />
              </IconButton>
            </div>

            {/* Schedule */}
            <div>
              <Box>
                <Clock />
                <Typography variant="h6">Schedule:</Typography>
                <IconButton onClick={() => createSchedule()}>
                  <Plus />
                </IconButton>
                <Box>
                  {activeModule.schedule.length > 0 ? (
                    <Box>
                      {activeModule.schedule.map((sch, i) =>
                        sch.days.map((day, j) => (
                          <Box key={`${sch._id}`}>
                            <Button variant="outlined" onClick={() => handleModalOpen(sch._id)}>{day.fromHr}</Button> TO 
                            <Button variant="outlined" onClick={() => handleModalOpen(sch._id)}>{day.toHr}</Button> 
                            <Button onClick={() => handleModalOpen(sch._id)}>{day.name.substring(0, 3)}</Button>
                          </Box>
                        ))
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2">No schedule</Typography>
                  )}
                </Box>
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

      {/* Schedule modal */}
      {activeModule && <ModalSchedule open={scheduleModal} handleClose={handleModalClose} scheduleId={selectedScheduleId} />}
    </Box>
  );
};

export default ModulePanel;
