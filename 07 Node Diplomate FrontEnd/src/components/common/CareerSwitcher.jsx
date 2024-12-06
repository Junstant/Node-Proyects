import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import { Menu, MenuItem, Button, Box, Typography, Tooltip } from "@mui/material";
import { ArrowsLeftRight, CaretDown } from "@phosphor-icons/react";
import themeNew from "../../assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import "../../assets/styles/global.css";

// ? ------------------ CareerSwitcher Component ------->
const CareerSwitcher = () => {
  // # -> Get the active career and year from the store
  const { careers, activeCareer, setActiveCareer, setActiveYear, activeYear } = useUserStore();

  // # -> States
  const [careerAnchorEl, setCareerAnchorEl] = useState(null);
  const [yearAnchorEl, setYearAnchorEl] = useState(null);

  // # -> Open and close the menus
  const handleCareerMenuOpen = (event) => setCareerAnchorEl(event.currentTarget);
  const handleCareerMenuClose = () => setCareerAnchorEl(null);
  const handleYearMenuOpen = (event) => setYearAnchorEl(event.currentTarget);
  const handleYearMenuClose = () => setYearAnchorEl(null);

  // # -> Set the active career
  const handleSelectCareer = (career) => {
    setActiveCareer(career);

    // Reset active year if it doesn't exist in the new career
    if (career && career.years && !career.years.some((year) => year.id === activeYear?.id)) {
      setActiveYear(null);
    }
    handleCareerMenuClose();
  };

  // # -> Set the active year
  const handleSelectYear = (year) => {
    setActiveYear(year);
    handleYearMenuClose();
  };

  // # -> Get the active career and year names
  const getActiveCareerName = () => (activeCareer ? activeCareer.name : "Select a career...");
  const getActiveYearName = () => (activeYear ? activeYear.name : "Select a year...");

  // # -> Load the active career and year from localStorage
  useEffect(() => {
    const savedStore = localStorage.getItem("user-store");
    const parsedStore = savedStore ? JSON.parse(savedStore) : {};

    if (!activeCareer && careers.length > 0 && parsedStore.activeCareer) {
      const matchedCareer = careers.find((career) => career.id === parsedStore.activeCareer.id);
      if (matchedCareer) {
        setActiveCareer(matchedCareer);
      }
    }

    if (activeCareer && !activeYear && parsedStore.activeYear) {
      const matchedYear = activeCareer.years.find((year) => year.id === parsedStore.activeYear.id);
      if (matchedYear) {
        setActiveYear(matchedYear);
      }
    }
  }, [careers, activeCareer, activeYear, setActiveCareer, setActiveYear]);

  // ? ------------------ CareerSwitcher Component ------->
  return (
    <Box className="w-full">
      {/* Career and year switcher */}
      <section className="flex flex-row gap-2 justify-between items-center">
        <h5 className="text-white font-semibold leading-none pointer-events-none">
          {getActiveCareerName() || "Career and Year"}
        </h5>
        <div className="flex flex-row gap-4">
          <ThemeProvider theme={themeNew}>
            {/* Career */}
            <div>
              <Tooltip title={getActiveCareerName() || "Select a career..."}>
              <Button variant="outlined" className="clickMini" onClick={handleCareerMenuOpen}>
                <ArrowsLeftRight />
              </Button>
              <Menu anchorEl={careerAnchorEl} open={Boolean(careerAnchorEl)} onClose={handleCareerMenuClose}>
                {/* --------------------- Select career ------------------- */}
                {careers.map((career) => (
                  <MenuItem key={career.id} onClick={() => handleSelectCareer(career)}>
                    {career.name}
                  </MenuItem>
                ))}
              </Menu>
              </Tooltip>
            </div>

            {/* Year */}
            <div>
              <Tooltip title={getActiveYearName() || "Select a year..."}>
                <Button variant="outlined" className="clickMini" onClick={handleYearMenuOpen} disabled={!activeCareer || activeCareer.years.length === 0}>
                  <CaretDown />
                </Button>
              </Tooltip>
              <Menu anchorEl={yearAnchorEl} open={Boolean(yearAnchorEl)} onClose={handleYearMenuClose}>
                {/* --------------------- Select year ------------------- */}
                {activeCareer &&
                  activeCareer.years.map((year) => (
                    <MenuItem key={year.id} onClick={() => handleSelectYear(year)}>
                      {year.name}
                    </MenuItem>
                  ))}
              </Menu>
            </div>
          </ThemeProvider>
        </div>
      </section>
    </Box>
  );
};

export default CareerSwitcher;
