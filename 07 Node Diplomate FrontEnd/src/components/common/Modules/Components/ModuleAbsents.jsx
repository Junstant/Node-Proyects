import React, { useState, useRef } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tooltip, Typography, IconButton, Stack } from "@mui/material";
import { Trash, Plus, Pencil, CalendarX, Hash, X, Check, CalendarDots } from "@phosphor-icons/react";
import useUserStore from "../../../../stores/userStore";
import handleCreateAbsent from "../Absents/createAbsent";
import handleDeleteAbsent from "../Absents/deleteAbsent";
import handleUpdateAbsent from "../Absents/updateAbsent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs-plugin-utc";
import "../../../../assets/styles/global.css";
import themeNew from "../../../../assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

// ? ------------------ ModuleAbsents Logic ------->
const ModuleAbsents = () => {
  const { activeModule, setModules, modules, setActiveModule } = useUserStore();

  // -> State for modal and new absent data
  const [modalOpen, setModalOpen] = useState(false);
  const [newAbsent, setNewAbsent] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    reason: "",
  });

  // -> Dayjs configuration to local time
  dayjs.extend(utc);

  // -> State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editAbsentId, setEditAbsentId] = useState(null);

  // -> Error state
  const [errors, setErrors] = useState({ absent: "", reason: "" });

  // -> Drag states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);

  // -> Handle modal open and close
  const handleModalOpen = () => {
    setIsEditing(false);
    setNewAbsent({
      date: dayjs().format("YYYY-MM-DD"),
      reason: "",
    });
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  // ^ -----> Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAbsent((prev) => ({ ...prev, [name]: value }));
  };

  // ^ -----> Handle submit
  const handleSave = async () => {
    if (!newAbsent.date) {
      setErrors({ absent: "Please provide a valid date." });
      return;
    }

    if (!newAbsent.reason) {
      setErrors({ reason: "Please provide a valid reason." });
      return;
    }

    //% -----> If we are editing an absent
    if (isEditing) {
      const newAbsentInfo = { ...newAbsent, absenceNumber: newAbsent.absenceNumber };
      await handleUpdateAbsent(setActiveModule, setModules, modules, setErrors, newAbsentInfo, editAbsentId, activeModule);
    }

    //% -----> If we are creating a new absent
    else {
      const absenceNumber = activeModule.absents.length + 1;
      const absentInfo = { ...newAbsent, absenceNumber };
      await handleCreateAbsent(setModules, setErrors, setActiveModule, modules, activeModule, absentInfo);
    }
    handleModalClose();
  };

  // ^ -----> Handle delete
  const handleDelete = (_id) => {
    const updatedAbsents = activeModule.absents.filter((absent) => absent._id !== _id);
    const updatedModule = { ...activeModule, absents: updatedAbsents };
    setActiveModule(updatedModule);
    handleDeleteAbsent(setModules, setErrors, setActiveModule, modules, activeModule, _id, activeModule);
  };

  // ^ -----> Handle edit
  const handleEdit = (_id) => {
    const absentToEdit = activeModule.absents.find((absent) => absent._id === _id);
    setIsEditing(true);
    setEditAbsentId(_id);
    setNewAbsent(absentToEdit);
    setModalOpen(true);
  };

  //^ ----> Scroll functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    document.body.classList.add("no-select");
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.classList.remove("no-select");
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX - scrollContainerRef.current.offsetLeft;
    const scroll = (x - startX) * 2; // Adjust the speed of scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - scroll;
  };

  return (
    <section>
      {/* ------------ Absent title ------------ */}
      <Stack direction="row" justifyContent="space-between">
        {/*  Absent title */}
        <Stack direction="row" gap={1} alignItems="center" color={activeModule.color}>
          <CalendarX size={25} />
          <h6 className="text-xl">Absents:</h6>
        </Stack>

        {/*  Add a new absent */}
        <Tooltip PopperProps={{ className: "tooltipGray" }} title="Add a new dependency">
          <Button
            variant="outlined"
            onClick={handleModalOpen}
            sx={{
              minWidth: "30px",
              height: "30px",
              padding: 0,
              color: activeModule.color,
              borderColor: activeModule.color,
              ":hover": { backgroundColor: activeModule.color, color: "var(--color-secondary)" },
            }}
          >
            <Plus size={17} />
          </Button>
        </Tooltip>
      </Stack>

      {/* ------------ Modal------------ */}
      <ThemeProvider theme={themeNew}>
        <Dialog PaperProps={{ className: "modalPaperStyleOne" }} open={modalOpen} onClose={handleModalClose}>
          <DialogTitle className="text-white">{isEditing ? "Edit Absent" : "Add Absent"}</DialogTitle>
          <DialogContent>
            {/*  Absent date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  className="w-full"
                  label="Date"
                  value={dayjs(newAbsent.date)} // Ensure this is a dayjs object
                  onChange={(newValue) => setNewAbsent((prev) => ({ ...prev, date: newValue }))} // newValue is already a dayjs object
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="DD/MM/YYYY"
                  error={Boolean(errors.absent)}
                  helperText={errors.absent}
                />
              </DemoContainer>
            </LocalizationProvider>

            {/* Absent reason */}
            <TextField
              error={errors.reason ? true : false}
              required
              label="Reason"
              fullWidth
              name="reason"
              value={newAbsent.reason}
              onChange={handleInputChange}
              margin="normal"
              helperText={errors.reason}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} sx={{ color: "#ff43c0" }} className="btn-custom-denied" startIcon={<X />}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="btn-custom-accept" startIcon={<Check />}>
              {isEditing ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>

      {/* ------------ Absents list ------------ */}
      <section
        ref={scrollContainerRef}
        className="flex flex-row gap-3 border p-4 mt-2 text-quaternary rounded-xl overflow-x-scroll w-full items-center justify-start"
        style={{ borderColor: activeModule.color, WebkitScrollbar: "none", scrollbarWidth: "none" }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={(e) => {
          scrollContainerRef.current.scrollLeft += e.deltaY * 0.2;
        }}
      >
        {activeModule?.absents.length > 0 ? (
          activeModule.absents.map((absent) => (
            <div key={absent._id} className="h-30 min-w-32 flex flex-col gap-1 border border-quaternary rounded-lg p-1 items-center justify-between cursor-move">
              {/* -------- Absent year and edit ----- */}
              <div className="flex flex-row justify-between w-full">
                {/* Absent year */}
                <Stack direction="row" alignItems="center" className="pointer-events-none">
                  <CalendarDots size={20} className="m-1" />
                  <Typography fontSize={10}>{dayjs(absent.date).format("DD MMM")}</Typography>
                </Stack>

                {/* Edit absent */}
                <IconButton className="iconBtnMini" size="small" onClick={() => handleEdit(absent._id)}>
                  <Pencil />
                </IconButton>
              </div>

              {/* -------- Absent date and reason ----- */}
              <div className="flex flex-col justify-center align-middle text-center my-2" variant="h6" textAlign="center">
                <h6 className="text-xl text-white leading-none">{dayjs(absent.date).format("DD MMM")}</h6>
                <Tooltip PopperProps={{ className: "tooltipGray" }} title={absent.reason}>
                  <Typography variant="body2" className="cursor-pointer" noWrap color={activeModule.color}>
                    {absent.reason.length > 15 ? `${absent.reason.substring(0, 10)}...` : absent.reason}
                  </Typography>
                </Tooltip>
              </div>

              {/* -------- Absent number and delete ----- */}
              <div className="flex flex-row justify-between w-full">
                <span className="flex flex-row items-center text-sm" style={{ color: activeModule.color }}>
                  <Hash className="ml-1" />
                  {absent.absenceNumber}
                </span>
                <IconButton className="iconBtnMini" size="small" onClick={() => handleDelete(absent._id)}>
                  <Trash />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="body2" className="text-quaternary pointer-events-none" textAlign="left" sx={{ width: "100%", padding: 1 }}>
            <span>Perfect attendance ;)</span>
          </Typography>
        )}
      </section>
    </section>
  );
};

export default ModuleAbsents;
