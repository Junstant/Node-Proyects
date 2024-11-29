import React, { useEffect, useState } from "react";
import { Stack, Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, TextField, FormHelperText } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Clock, Plus, Trash, NotePencil, X } from "@phosphor-icons/react";
import useUserStore from "../../../../stores/userStore";
import handleUpdateSchedule from "../Schedules/updateSchedule";
import handleDeleteSchedule from "../Schedules/deleteSchedule";
import handleCreateSchedule from "../Schedules/createSchedule";

const ScheduleManager = () => {
  const { activeModule, modules, setActiveModule, setModules } = useUserStore();

  const [scheduleId, setScheduleId] = useState(null);
  const [fromHr, setFromHr] = useState(dayjs());
  const [toHr, setToHr] = useState(dayjs());
  const [day, setDay] = useState("");
  const [error, setError] = useState({ schedule: "" });
  const [openModals, setOpenModals] = useState({}); // Estado para manejar modales abiertos
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleOpenModal = (id) => {
    setScheduleId(id);
    setOpenModals((prev) => ({ ...prev, [id]: true }));
    const activeSchedule = modules.flatMap((mod) => mod.schedule).find((sch) => sch._id === id);
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
  };

  // # ---> Errror state
  const [errorsModule, setErrorsModule] = useState({schedule: ""});

  const handleCloseModal = (id) => {
    setOpenModals((prev) => ({ ...prev, [id]: false }));
    setFromHr(dayjs());
    setToHr(dayjs());
    setDay("");
    setError({ schedule: "" });
  };

  const handleSaveChanges = async () => {
    if (!fromHr || !toHr || !day) {
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
    setOpenModals((prev) => ({ ...prev, [scheduleId]: false }));
  };

  // ^ -----> Delete schedule
  const deleteSchedule = async (id) => {
    await handleDeleteSchedule(setModules, setErrorsModule, setActiveModule, modules, activeModule, id);
  };

  // ^ -----> Create a new schedule
  const createSchedule = async () => {
    if (activeModule) {
      await handleCreateSchedule(setModules, setErrorsModule, setActiveModule, modules, activeModule);
    } else {
      setErrorsModule({ edit: "Please select a module to create a schedule." });
    }
  };

  return (
    <Box>
      <Box>
        <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Clock size={30} />
            <Typography variant="h6">Schedule:</Typography>
          </Stack>
          <Button variant="outlined" sx={{ minWidth: "30px", height: "30px", padding: 0 }} onClick={createSchedule}>
            <Plus size={17} />
          </Button>
        </Stack>
      </Box>
      <Box sx={{ border: 1, borderColor: activeModule.color, padding: 2, marginTop: 1, borderRadius: 2 }}>
        {activeModule.schedule.length > 0 ? (
          activeModule.schedule.map((sch) =>
            sch.days.map((day, j) => (
              <Stack key={`${sch._id}-${j}`} direction="row" alignItems={"center"}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button variant="outlined" sx={{borderColor: activeModule.color, color: activeModule.color}} onClick={() => handleOpenModal(sch._id)}>
                    {day.fromHr}
                  </Button>
                  <Typography>TO</Typography>
                  <Button variant="outlined" sx={{borderColor: activeModule.color, color: activeModule.color}} onClick={() => handleOpenModal(sch._id)}>
                    {day.toHr}
                  </Button>
                  <Button onClick={() => handleOpenModal(sch._id)} sx={{ color: activeModule.color}}>
                    {day.name.substring(0, 3)}
                  </Button>
                </Stack>
                <Button sx={{ minWidth: "30px", height: "30px", padding: 0 }} onClick={() => deleteSchedule(sch._id)}>
                  <Trash />
                </Button>

                {/* Individual Modal */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Dialog open={!!openModals[sch._id]} onClose={() => handleCloseModal(sch._id)}>
                    <DialogTitle>{scheduleId ? "Edit Schedule" : "New Schedule"}</DialogTitle>
                    <DialogContent>
                      <TimePicker label="From" value={fromHr} onChange={(newValue) => setFromHr(newValue)} slotProps={{ textField: { fullWidth: true, margin: "normal" } }} />
                      <TimePicker label="To" value={toHr} onChange={(newValue) => setToHr(newValue)} slotProps={{ textField: { fullWidth: true, margin: "normal" } }} />
                      <TextField select label="Day" value={day.name} onChange={(e) => setDay(e.target.value)} fullWidth margin="normal">
                        {daysOfWeek.map((dayOption) => (
                          <MenuItem key={dayOption} value={dayOption}>
                            {dayOption}
                          </MenuItem>
                        ))}
                      </TextField>
                    </DialogContent>
                    <DialogActions>
                      {error.schedule && <FormHelperText error>{error.schedule}</FormHelperText>}
                      <Button startIcon={<X />} onClick={() => handleCloseModal(sch._id)}>
                        Cancel
                      </Button>
                      <Button startIcon={<NotePencil />} onClick={handleSaveChanges}>
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </LocalizationProvider>
              </Stack>
            ))
          )
        ) : (
          <Typography variant="body2">No schedules</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ScheduleManager;
