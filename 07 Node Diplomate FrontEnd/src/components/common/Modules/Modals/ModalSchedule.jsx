import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, TextField, FormHelperText } from "@mui/material";
import { NotePencil, X } from "@phosphor-icons/react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useUserStore from "../../../../stores/userStore";

// ? ------------------ ModalSchedule Logic ------->
const ModalSchedule = ({ open, handleClose, scheduleId, handleSave }) => {
  const { modules } = useUserStore();
  const [fromHr, setFromHr] = useState(dayjs());
  const [toHr, setToHr] = useState(dayjs());
  const [day, setDay] = useState("");
  const [error, setError] = useState("");

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Cargar datos del horario activo
  useEffect(() => {
    if (scheduleId && modules) {
      const activeSchedule = modules.flatMap((mod) => mod.schedule).find((sch) => sch._id === scheduleId);

      if (activeSchedule && activeSchedule.days.length > 0) {
        const currentDay = activeSchedule.days[0];
        setFromHr(dayjs(currentDay.fromHr, "HH:mm"));
        setToHr(dayjs(currentDay.toHr, "HH:mm"));
        setDay(currentDay.name || "");
      } else {
        setFromHr(dayjs());
        setToHr(dayjs());
        setDay("");
      }
    }
  }, [scheduleId, modules]);

  // Validación y guardado
  const handleSaveChanges = () => {
    if (!fromHr || !toHr || !day) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    const newScheduleInfo = {
      _id: scheduleId,
      fromHr: fromHr.format("HH:mm"),
      toHr: toHr.format("HH:mm"),
      day,
    };

    handleSave(newScheduleInfo);
    handleClose();
  };
// ? ------------------ ModalSchedule Logic ------->
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
          <TimePicker label="From" value={fromHr} onChange={(newValue) => setFromHr(newValue)} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
          <TimePicker label="To" value={toHr} onChange={(newValue) => setToHr(newValue)} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
          <TextField select label="Day" value={day} onChange={(e) => setDay(e.target.value)} fullWidth margin="normal">
            {daysOfWeek.map((dayOption) => (
              <MenuItem key={dayOption} value={dayOption}>
                {dayOption}
              </MenuItem>
            ))}
          </TextField>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </DialogContent>
        <DialogActions>
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
