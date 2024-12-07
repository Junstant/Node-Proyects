import React, { useState } from "react";
import { Stack, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, TextField, FormHelperText, Tooltip } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Clock, Plus, Trash, X, Check } from "@phosphor-icons/react";
import useUserStore from "../../../../stores/userStore";
import handleUpdateSchedule from "../Schedules/updateSchedule";
import handleDeleteSchedule from "../Schedules/deleteSchedule";
import handleCreateSchedule from "../Schedules/createSchedule";
import "../../../../assets/styles/global.css";
import themeNew from "../../../../assets/styles/theme";
import { ThemeProvider } from "@emotion/react";
import SmoothAlert from "../../SmoothAlert";

const ScheduleManager = () => {
  const { activeModule, modules, setActiveModule, setModules } = useUserStore();

  const [scheduleId, setScheduleId] = useState(null);
  const [fromHr, setFromHr] = useState(dayjs());
  const [toHr, setToHr] = useState(dayjs());
  const [day, setDay] = useState("");
  const [error, setError] = useState({ schedule: "" });
  const [openModals, setOpenModals] = useState({});
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // ^ -----> Open modal
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
    await handleDeleteSchedule(setModules, setError, setActiveModule, modules, activeModule, id);
  };

  // ^ -----> Create a new schedule
  const createSchedule = async () => {
    if (activeModule) {
      await handleCreateSchedule(setModules, setError, setActiveModule, modules, activeModule);
    } else {
      setErrorsModule({ schedule: "Please select a module to create a schedule." });
    }
  };

  return (
    <section className="heroModalSchedule">
      {error.schedule && <SmoothAlert message={error.schedule} severity="error" />}
      <div>
        <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction="row" spacing={1} alignItems={"center"} color={activeModule.color}>
            <Clock size={25} />
            <h6 className="text-xl">Schedule:</h6>
          </Stack>
          <Tooltip PopperProps={{ className: "tooltipGray" }} title="Create a new schedule">
            <Button
              variant="outlined"
              sx={{
                minWidth: "30px",
                height: "30px",
                padding: 0,
                color: activeModule.color,
                borderColor: activeModule.color,
                ":hover": { backgroundColor: activeModule.color, color: "var(--color-secondary)"},
              }}
              onClick={createSchedule}
            >
              <Plus size={17} />
            </Button>
          </Tooltip>
        </Stack>
      </div>
      <div className="flex flex-col gap-3 border border-strokeT p-4 mt-5 text-quaternary rounded-xl">
        {activeModule.schedule.length > 0 ? (
          activeModule.schedule.map((sch) =>
            sch.days.map((day, j) => (
              <div key={`${sch._id}-${j}`} className="flex flex-row items-center justify-between">
                {/* Start schedule to end schedule and day  */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button variant="outlined" sx={{ borderColor: activeModule.color, color: activeModule.color }} onClick={() => handleOpenModal(sch._id)}>
                    {day.fromHr}
                  </Button>
                  <Typography className="text-white">TO</Typography>
                  <Button variant="outlined" sx={{ borderColor: activeModule.color, color: activeModule.color }} onClick={() => handleOpenModal(sch._id)}>
                    {day.toHr}
                  </Button>
                  <Button className="btnNeutral" onClick={() => handleOpenModal(sch._id)} sx={{ color: activeModule.color }}>
                    {day.name.substring(0, 3)}
                  </Button>
                </Stack>

                {/* delete button */}
                <Tooltip PopperProps={{ className: "tooltipGray" }} title="Delete schedule">
                  <Button className="btnNeutral" sx={{ padding: "5px", color: "var(--color-quaternary)" }} onClick={() => deleteSchedule(sch._id)}>
                    <Trash size={20} />
                  </Button>
                </Tooltip>

                {/* Individual Modal */}
                <ThemeProvider theme={themeNew}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Dialog open={!!openModals[sch._id]} onClose={() => handleCloseModal(sch._id)} PaperProps={{ className: "modalPaperStyleOne" }} className="backdrop-blur-sm">
                      <DialogTitle className="text-white">{scheduleId ? "Edit Schedule" : "New Schedule"}</DialogTitle>
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
                        <Button sx={{ color: "#ff43c0" }} className="btn-custom-denied" startIcon={<X />} onClick={() => handleCloseModal(sch._id)}>
                          Cancel
                        </Button>
                        <Button startIcon={<Check />} className="btn-custom-accept" onClick={handleSaveChanges}>
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            ))
          )
        ) : (
          <Typography variant="body2">No schedules</Typography>
        )}
      </div>
    </section>
  );
};

export default ScheduleManager;
