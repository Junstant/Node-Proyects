import React, { useState, useEffect } from "react";
import useUserStore from "../../../stores/userStore";
import handleDeleteModule from "./deleteModule";
import handleUpdateModule from "./updateModule";
import { Button, Typography, Box, IconButton, Stack, Chip, Tooltip } from "@mui/material";
import { Trash, Medal, NotePencil, X, MapPin, GraduationCap, ChartDonut, CalendarDots, Timer, Check } from "@phosphor-icons/react";
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
import { TwitterPicker } from "react-color";

// ? ------------------ ModulePanel Logic ------->
const ModulePanel = () => {
  // # -> Get the active module and year
  const { modules, activeModule, activeYear, activeCareer, setModules, setActiveModule, setActiveYear, setActiveCareer } = useUserStore();

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

  // ^ -----> Color picker
  const colors = [
    "#FF5959", // Red
    "#FF8C8C", // Light red
    "#FF9F86", // Orange
    "#FFB482", // Light orange
    "#FFC87A", // Yellow
    "#FFDD74", // Light yellow
    "#D8FF74", // Light green
    "#A8FF74", // Green
    "#74FFA8", // Light teal
    "#74E9FF", // Teal
    "#74C6FF", // Light blue
    "#749AFF", // Blue
    "#9274FF", // Light purple
    "#B974FF", // Purple
    "#D874FF", // Light pink
    "#FF74D8", // Pink
    "#FF74B9", // Light pink
    "#FF8EB3", // Pink
    "#FF9EC9", // Light pink
    "#FFB1E1", // Pink
    "#FFC2F4", // Light pink
  ];

  // # -> Color picker states
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [tempColor, setTempColor] = useState(activeModule.color);

  // # -> Handle the color picker close and open
  const toggleColorPicker = () => setIsColorPickerOpen(!isColorPickerOpen);

  // # -> Handle the color change
  const handleColorChange = async (newColor) => {
    if (newColor === activeModule.color) {
      setIsColorPickerOpen(false);
      return;
    } // No change
    if (!newColor) return; // No color

    // # -> Create the new module object
    const newInfoModule = { color: newColor };

    try {
      // # -> Update the module using the existing handleUpdateModule function
      await handleUpdateModule(setModules, setErrorsModule, setActiveModule, modules, activeModule, newInfoModule);

      // # -> Close the color picker
      setIsColorPickerOpen(false);
    } catch (error) {
      console.error("Error updating module color:", error);
    }
  };

  // ? ------------------------------------- Functions -------------------------------------

  // ^ -----> Helper: Calculate average notes
  const calculateAverage = (notes) => (notes.length > 0 ? (notes.reduce((acc, note) => acc + note, 0) / notes.length).toFixed(1) : "0.0");

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
      await handleDeleteModule(setModules, setErrorsModule, activeModule._id, activeYear, modules, setActiveModule, setActiveYear, activeYear, setActiveCareer, activeCareer);
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
                    {/* Number and change color menu */}
                    <Typography
                      className="cursor-pointer"
                      sx={{ padding: 1, border: 2, borderColor: activeModule.color, borderRadius: 2, color: activeModule.color }}
                      variant="h4"
                      onClick={toggleColorPicker}
                    >
                      {activeModule.index}
                    </Typography>

                    {/* Color picker */}
                    {isColorPickerOpen && (
                      <div className="absolute bg-secondary" onClick={(e) => e.stopPropagation()}>
                        <TwitterPicker colors={colors} className="bg-secondary" color={tempColor} onChange={(color) => setTempColor(color.hex)} />
                        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1, padding: 1 }}>
                          <Button sx={{ color: "#ff43c0" }} className="btn-custom-denied" startIcon={<X />} onClick={toggleColorPicker}>
                            Cancel
                          </Button>
                          <Button
                            className="btn-custom-accept"
                            startIcon={<Check />}
                            onClick={() => {
                              handleColorChange(tempColor);
                            }}
                          >
                            Save
                          </Button>
                        </Box>
                      </div>
                    )}

                    {/* Mudule name */}
                    <Typography color={activeModule.color} variant="h4" className="cursor-pointer break-all" onClick={confirmEditName}>
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
              {/* Location */}
              <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Stack direction="row" spacing={1} alignItems={"center"} color={activeModule.color}>
                  <MapPin size={25} />
                  <h6 className="text-xl">Location:</h6>
                  <p className="text-white cursor-pointer" onClick={handleOpenLocationModal}>
                    {activeModule.location}
                  </p>
                </Stack>

                {/*  Edit location */}
                <Tooltip PopperProps={{ className: "tooltipGray" }} title="Edit module location">
                  <IconButton className="iconBtnMini" onClick={handleOpenLocationModal}>
                    <NotePencil />
                  </IconButton>
                </Tooltip>
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
            <div className="mt-2">
              <Dependencies />
            </div>

            {/* State */}
            <div className="mt-4">
              <Stack direction="row" spacing={1} alignItems={"center"} color={activeModule.color}>
                <ChartDonut size={25} />
                <h6 className="text-xl">State:</h6>
                <ModuleState />
              </Stack>
            </div>

            {/* Absences */}
            <div className="mt-2">
              <ModuleAbsents />
            </div>

            {/* Period */}
            <div>
              <Stack direction="row" spacing={1} color={activeModule.color} alignItems={"center"} marginTop={2}>
                <CalendarDots size={25} />
                <h6 className="text-xl">Period:</h6>
                <ModuleDetailsSelector />
              </Stack>
            </div>

            {/* Time block */}
            <div className="mt-2">
              <Stack direction="row" spacing={1} color={activeModule.color} alignItems={"center"}>
                <Timer size={25} />
                <Typography variant="h6">Time Block:</Typography>
              </Stack>
              <ModuleTimeBlock />
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
