import React, { useState, useEffect } from "react";
import useUserStore from "../../../stores/userStore";
import handleDeleteModule from "./deleteModule";
import { Button, Typography, Box, IconButton, Stack, Chip, Tooltip } from "@mui/material";
import { Trash, Medal, NotePencil, X, MapPin, GraduationCap, ChartDonut, CalendarDots, Timer } from "@phosphor-icons/react";
import ModalPopUp from "../ModalPopUp";
import ModalName from "./Modals/ModalName";
import ModalLocation from "./Modals/ModalLocation";
import ModalProfessor from "./Modals/ModalProfessor";
import Dependencies from "./Components/Dependencies";
import ModuleState from "./Components/ModuleState";
import ModuleAbsents from "./Components/ModuleAbsents";
import ModuleDetailsSelector from "./Components/ModulePeriod";
import ScheduleManager from "./Modals/ModalSchedule";
import ModuleTimeBlock from "./Components/ModuleTimeBlock";
import "../../../assets/styles/modulePanel.css";
import "../../../assets/styles/global.css";
import themeNew from "../../../assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

// ? ------------------ ModulePanel Logic ------->
const ModulePanel = () => {
  // # -> Get the active module and year
  const { modules, activeModule, activeYear, activeCareer, setModules, setActiveModule, setActiveYear } = useUserStore();

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

  // ^ -----> Convert hex to rgba
  function hexToRgba(hex, alpha) {
    // Remove the '#' symbol if present
    const cleanHex = hex.replace("#", "");

    // Divide the color into RGB components
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // Return the rgba format
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

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
      <div className="text-center flex flex-row w-full justify-center">
        <p>
          Are you sure you want to delete <b className="text-primary">"{activeModule.name}" ?</b>
        </p>
      </div>,
      <div className="w-full text-center">
        <p className="text-quaternary">This action cannot be undone.</p>
      </div>,
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

  // ? ------------------ Module panel Component ------->
  return (
    <section className="heroModulePanel">
      {/* Display the errors with the modal if there is an error */}
      {errorsModule.edit && handleOpenWithContent("Error", <SmoothAlert severity="error" message={errorsModule.edit} />)}

      {/* --------------- Display Module ----------- */}
      {activeModule && activeYear && activeCareer && (
        <div className="panelContainer" style={{ borderColor: activeModule.color }}>
          <ThemeProvider theme={themeNew}>
            {/* Top part */}
            <div>
              <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"space-between"}>
                {/* year and semester */}
                <div>
                  <Stack direction="row" spacing={1} alignItems={"center"}>
                    <Chip style={{ boxShadow: `0px 0px 30px ${hexToRgba(activeModule.color, 0.7)}` }} sx={{ background: activeModule.color }} label={activeModule.period.year} />
                    <Chip style={{ boxShadow: `0px 0px 30px ${hexToRgba(activeModule.color, 0.7)}` }} sx={{ background: activeModule.color }} label={activeModule.period.semester} />
                  </Stack>
                </div>

                {/* Average */}
                <div>
                  <Stack direction="row" spacing={1} alignItems={"center"}>
                    <div className="flex items-center gap-3" style={{ color: activeModule.color }}>
                      <h6 className="text-2xl">{activeModule.notes && calculateAverage(activeModule.notes)}</h6>
                      <Medal size={30} />
                    </div>
                    {/* Delete module */}
                    <Box>
                      <Button className="clickMiniGray" variant="outlined" onClick={confirmDelete}>
                        <Trash size={20} />
                      </Button>
                    </Box>
                  </Stack>
                </div>
              </Stack>
            </div>

            {/* Module name */}
            <div className="mt-4">
              <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Stack direction="row" spacing={2} alignItems={"center"}>
                    <Typography sx={{ padding: 1, border: 2, borderColor: activeModule.color, borderRadius: 2, color: activeModule.color }} variant="h4">
                      {activeModule.index}
                    </Typography>
                    <Typography color={activeModule.color} variant="h4" className="cursor-pointer" onClick={confirmEditName}>
                      {activeModule.name}
                    </Typography>
                  </Stack>
                </Box>
                <Tooltip PopperProps={{ className: "tooltipGray" }} title="Edit module name">
                  <IconButton className="iconBtnMini" onClick={confirmEditName}>
                    <NotePencil />
                  </IconButton>
                </Tooltip>
              </Stack>
            </div>

            {/* Schedule */}
            <div className="mt-4">
              <ScheduleManager />
            </div>

            {/* Location */}
            <div className="mt-4">
              <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems={"center"} color={activeModule.color}>
                    <MapPin size={25} />
                    <h6 className="text-xl">Location:</h6>
                    <p className="text-white cursor-pointer" onClick={handleOpenLocationModal}>
                      {activeModule.location}
                    </p>
                  </Stack>
                </Box>
                <Box>
                  <Tooltip PopperProps={{ className: "tooltipGray" }} title="Edit module location">
                    <IconButton className="iconBtnMini" onClick={handleOpenLocationModal}>
                      <NotePencil />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
            </div>

            {/* professor */}
            <div className="mt-2">
              <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Stack direction="row" spacing={1} alignItems={"center"} color={activeModule.color}>
                  <GraduationCap size={25} />
                  <h6 className="text-xl">Professor:</h6>
                  <p className="text-white cursor-pointer" onClick={handleOpenProfessorModal}>
                    {activeModule.professor}
                  </p>
                </Stack>
                <Box alignItems="center">
                  <Tooltip PopperProps={{ className: "tooltipGray" }} title="Edit module professor">
                    <IconButton className="iconBtnMini" onClick={handleOpenProfessorModal}>
                      <NotePencil />
                    </IconButton>
                  </Tooltip>
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
                  <ChartDonut size={30} />
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
                  <CalendarDots size={30} />
                  <Typography variant="h6">Period:</Typography>
                  <ModuleDetailsSelector />
                </Stack>
              </Box>
            </div>

            {/* Time block */}
            <div>
              <Box>
                <Stack direction="row" spacing={1} alignItems={"center"}>
                  <Timer size={30} />
                  <Typography variant="h6">Time Block:</Typography>
                </Stack>
                <ModuleTimeBlock />
              </Box>
            </div>
          </ThemeProvider>
        </div>
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
    </section>
  );
};

export default ModulePanel;
