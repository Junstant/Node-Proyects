import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, TextField, FormHelperText } from "@mui/material";
import { NotePencil, X } from "@phosphor-icons/react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useUserStore from "../../../../stores/userStore";
import handleUpdateSchedule from "../Schedules/updateSchedule";

// ? ------------------ ModalSchedule Logic -------> 
const ModalSchedule = ({ scheduleId, triggerModal, setTriggerModal }) => {
  // # -> Get the active module and year
  const { modules, setActiveModule, setModules } = useUserStore();
  
  // # -> States
  const [fromHr, setFromHr] = useState(dayjs());
  const [toHr, setToHr] = useState(dayjs());
  const [day, setDay] = useState("");
  const [error, setError] = useState({ schedule: "" });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // ^ -> Control modal open/close based on triggerModal
  useEffect(() => {
    if (scheduleId && modules) {
      const activeSchedule = modules.flatMap((mod) => mod.schedule).find((sch) => sch._id === scheduleId);
      if (activeSchedule && activeSchedule.days.length > 0) {
        const currentDay = activeSchedule.days[0];
        setFromHr(dayjs(currentDay.fromHr, "HH:mm") || dayjs());
        setToHr(dayjs(currentDay.toHr, "HH:mm") || dayjs());
        setDay(currentDay.name || "");
      } else {
        setFromHr(dayjs());
        setToHr(dayjs());
        setDay("");
      }
    }
  }, [scheduleId, modules]);

  // ^ -----> Handle save changes
  const handleSaveChanges = async () => {
    if (!fromHr || !toHr || !day || scheduleId === null) {
      setError((prevError) => ({ ...prevError, schedule: "Please provide all the schedule information." }));
      return;
    }

    const newScheduleInfo = {
      _id: scheduleId,
      fromHr: fromHr.format("HH:mm"),
      toHr: toHr.format("HH:mm"),
      name: day,
    };

    await handleUpdateSchedule(setActiveModule, setModules, modules, setError, newScheduleInfo, scheduleId);
    setError((prevError) => {
      if (!prevError.schedule) {
        setTriggerModal(false); 
      }
      return prevError;
    });
  };

  // ^ -----> Handle modal close
  const handleClose = () => {
    setTriggerModal(false);
    setError({ schedule: "" });
    setFromHr(dayjs());
    setToHr(dayjs());
    setDay("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={triggerModal} onClose={handleClose} container={document.body}>
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
          <TimePicker label="From" value={fromHr} onChange={(newValue) => setFromHr(newValue)} slotProps={{ textField: { fullWidth: true, margin: "normal" } }} />
          <TimePicker label="To" value={toHr} onChange={(newValue) => setToHr(newValue)} slotProps={{ textField: { fullWidth: true, margin: "normal" } }} />
          <TextField select label="Day" value={day} onChange={(e) => setDay(e.target.value)} fullWidth margin="normal">
            {daysOfWeek.map((dayOption) => (
              <MenuItem key={dayOption} value={dayOption}>
                {dayOption}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          {error.schedule && <FormHelperText error>{error.schedule}</FormHelperText>}
          <Button startIcon={<X />} onClick={handleClose}>
            Cancel
          </Button>
          <Button startIcon={<NotePencil />} onClick={handleSaveChanges}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ModalSchedule;
