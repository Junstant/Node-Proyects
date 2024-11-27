import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import { Menu, MenuItem, Button, Box } from "@mui/material";
import { ArrowsLeftRight, CaretDown } from "@phosphor-icons/react";

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
    localStorage.setItem("user-store", JSON.stringify({ activeCareer: career })); // Guardar carrera seleccionada

    // Reset active year if it doesn't exist in the new career
    if (career && career.years && !career.years.some((year) => year.id === activeYear?.id)) {
      setActiveYear(null);
      localStorage.setItem("user-store", JSON.stringify({ activeYear: null })); // Guardar null para el año
    }
    handleCareerMenuClose();
  };

  // # -> Set the active year
  const handleSelectYear = (year) => {
    setActiveYear(year);
    localStorage.setItem("user-store", JSON.stringify({ activeYear: year })); // Guardar año seleccionado
    handleYearMenuClose();
  };

  // # -> Get the active career and year names
  const getActiveCareerName = () => (activeCareer ? activeCareer.name : "Select a career");
  const getActiveYearName = () => (activeYear ? activeYear.name : "Select a year");

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
    <Box>
      {/* Career */}
      <Box display="flex" alignItems="center" gap={1}>
        <Box>
          <h1>{getActiveCareerName()}</h1>
          <Button variant="outlined" onClick={handleCareerMenuOpen}>
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
        </Box>

        {/* Year */}
        <Box>
          <h1>{getActiveYearName()}</h1>
          <Button variant="outlined" onClick={handleYearMenuOpen} disabled={!activeCareer || activeCareer.years.length === 0}>
            <CaretDown />
          </Button>
          <Menu anchorEl={yearAnchorEl} open={Boolean(yearAnchorEl)} onClose={handleYearMenuClose}>
            {/* --------------------- Select year ------------------- */}
            {activeCareer &&
              activeCareer.years.map((year) => (
                <MenuItem key={year.id} onClick={() => handleSelectYear(year)}>
                  {year.name}
                </MenuItem>
              ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default CareerSwitcher;
