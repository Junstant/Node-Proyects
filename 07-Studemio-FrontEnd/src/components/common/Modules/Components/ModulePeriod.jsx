import React, { useState, useEffect } from "react";
import { Chip, Menu, MenuItem, Box, Stack } from "@mui/material";
import useUserStore from "../../../../stores/userStore";
import handleUpdateModule from "../updateModule";
import SmoothAlert from "../../SmoothAlert";
import themeNew from "../../../../assets/styles/Theme";
import { ThemeProvider } from "@mui/material/styles";

const ModuleDetailsSelector = () => {
  //# -> Get the active module from the global state
  const { activeModule, setModules, modules, setActiveModule } = useUserStore();

  //# -> States for semester
  const [currentSemester, setCurrentSemester] = useState("");
  const [semesterAnchorEl, setSemesterAnchorEl] = useState(null);

  //# -> States for period
  const [currentYear, setCurrentYear] = useState("");
  const [periodAnchorEl, setPeriodAnchorEl] = useState(null);

  //# -> Error states
  const [errors, setErrors] = useState({ semester: "", period: "" });

  //# -> Predefined options
  const availableSemesters = ["Bimonthly", "Quarterly", "Four-monthly", "Annual"];
  const availablePeriods = ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year", "Sixth Year", "Seventh Year", "Eighth Year", "Ninth Year", "Tenth Year"];

  // ^ -----> Load the current values from the active module when the component mounts or activeModule changes
  useEffect(() => {
    if (activeModule?.period?.semester) setCurrentSemester(activeModule.period.semester);
    if (activeModule?.period?.year) setCurrentYear(activeModule.period.year);
  }, [activeModule]);

  // ^ -----> Handle menu opening and closing for semester
  const handleSemesterMenuOpen = (event) => setSemesterAnchorEl(event.currentTarget);
  const handleSemesterMenuClose = () => setSemesterAnchorEl(null);

  // ^ -----> Handle menu opening and closing for period
  const handlePeriodMenuOpen = (event) => setPeriodAnchorEl(event.currentTarget);
  const handlePeriodMenuClose = () => setPeriodAnchorEl(null);

  // ^ -----> Handle semester change
  const handleSemesterChange = async (newSemester) => {
    if (newSemester !== currentSemester) {
      setCurrentSemester(newSemester);

      //* ---> Update the global state
      const newInfoModule = { period: { ...activeModule.period, semester: newSemester } };
      await handleUpdateModule(setModules, setErrors, setActiveModule, modules, activeModule, newInfoModule);
    }
    handleSemesterMenuClose();
  };

  // ^ -----> Handle period change
  const handlePeriodChange = async (newYear) => {
    if (newYear !== currentYear) {
      setCurrentYear(newYear);

      //* ---> Update the global state
      const newInfoModule = { period: { ...activeModule.period, year: newYear } };
      await handleUpdateModule(setModules, setErrors, setActiveModule, modules, activeModule, newInfoModule);
    }
    handlePeriodMenuClose();
  };

  return (
    <Box>
      {/* Errors */}
      {errors.semester && <SmoothAlert severity="error" message={errors.semester} />}
      {errors.period && <SmoothAlert severity="error" message={errors.period} />}

      <ThemeProvider theme={themeNew}>
        {/* Chip for Semester */}
        <Stack direction="row" spacing={1}>
          <Chip
            label={activeModule.period?.semester || "No Semester"}
            onClick={handleSemesterMenuOpen}
            variant="outlined"
            sx={{ borderColor: activeModule.color, color: activeModule.color, cursor: "pointer" }}
          />

          {/* Chip for Period */}
          <Chip
            label={activeModule.period?.year || "No Period"}
            onClick={handlePeriodMenuOpen}
            variant="outlined"
            sx={{ borderColor: activeModule.color, color: activeModule.color, cursor: "pointer" }}
          />
        </Stack>

        {/* Menu for selecting Semester */}
        <Menu classes={{ paper: "menuNeutral" }} anchorEl={semesterAnchorEl} open={Boolean(semesterAnchorEl)} onClose={handleSemesterMenuClose}>
          {availableSemesters.map((semester) => (
            <MenuItem
              sx={{ color: "#ADBEFF", "&:hover": { backgroundColor: activeModule.color, color: "var(--color-secondary)", boxShadow: `0px 5px 25px ${activeModule.color}50` } }}
              key={semester}
              onClick={() => handleSemesterChange(semester)}
              disabled={semester === currentSemester}
            >
              {semester}
            </MenuItem>
          ))}
        </Menu>

        {/* Menu for selecting Period */}
        <Menu classes={{ paper: "menuNeutral" }} anchorEl={periodAnchorEl} open={Boolean(periodAnchorEl)} onClose={handlePeriodMenuClose}>
          {availablePeriods.map((period) => (
            <MenuItem
              sx={{ color: "#ADBEFF", "&:hover": { backgroundColor: activeModule.color, color: "var(--color-secondary)", boxShadow: `0px 5px 25px ${activeModule.color}50` } }}
              key={period}
              onClick={() => handlePeriodChange(period)}
              disabled={period === currentYear} // Disable the current period
            >
              {period}
            </MenuItem>
          ))}
        </Menu>
      </ThemeProvider>
    </Box>
  );
};

export default ModuleDetailsSelector;
