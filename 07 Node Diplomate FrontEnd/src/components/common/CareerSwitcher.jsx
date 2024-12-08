import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore.js";
import { Menu, MenuItem, Button, Tooltip } from "@mui/material";
import { ArrowsLeftRight, CaretDown } from "@phosphor-icons/react";
import themeNew from "../../assets/styles/Theme.jsx";
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
    <div>
      {/* Career and year switcher */}
      <section className="flex flex-row gap-2 max-w-md justify-between items-center">
        <h5 className="text-white font-semibold leading-none pointer-events-none break-all">{getActiveCareerName() || "Career and Year"}</h5>
        <div className="flex flex-row gap-4">
          <ThemeProvider theme={themeNew}>
            {/* Career */}
            <div>
              <Tooltip title={getActiveCareerName() || "Select a career..."}>
                <span>
                  <Button variant="outlined" className="clickMini" disabled={careers.length === 0} onClick={handleCareerMenuOpen}>
                    <ArrowsLeftRight />
                  </Button>
                </span>
              </Tooltip>
              <Menu anchorEl={careerAnchorEl} open={Boolean(careerAnchorEl)} onClose={handleCareerMenuClose}>
                {/* --------------------- Select career ------------------- */}
                {careers.map((career) => (
                  <MenuItem key={career.id} onClick={() => handleSelectCareer(career)} selected={activeCareer && activeCareer.id === career.id}>
                    {career.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>

            {/* Year */}
            <div>
              <Tooltip title={getActiveYearName() || "Select a year..."}>
                <span>
                  <Button variant="outlined" className="clickMini" onClick={handleYearMenuOpen} disabled={!activeCareer || activeCareer.years.length === 0}>
                    <CaretDown />
                  </Button>
                </span>
              </Tooltip>
              <Menu anchorEl={yearAnchorEl} open={Boolean(yearAnchorEl)} onClose={handleYearMenuClose}>
                {/* --------------------- Select year ------------------- */}
                {activeCareer &&
                  activeCareer.years.map((year) => (
                    <MenuItem key={year.id} onClick={() => handleSelectYear(year)} selected={activeYear && activeYear.id === year.id}>
                      {year.name}
                    </MenuItem>
                  ))}
              </Menu>
            </div>
          </ThemeProvider>
        </div>
      </section>
    </div>
  );
};

export default CareerSwitcher;
