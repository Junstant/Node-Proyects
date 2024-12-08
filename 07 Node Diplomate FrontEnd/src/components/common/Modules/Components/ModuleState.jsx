import React, { useState, useEffect } from "react";
import { Chip, Menu, MenuItem, Box } from "@mui/material";
import useUserStore from "../../../../stores/userStore";
import handleUpdateModule from "../updateModule";
import "../../../../assets/styles/global.css";
import themeNew from "../../../../assets/styles/Theme";
import { ThemeProvider } from "@mui/material/styles";
import SmoothAlert from "../../SmoothAlert";

const ModuleState = () => {
  //# -> Get the active module from the global state
  const { activeModule, setModules, modules, setActiveModule } = useUserStore();

  //# -> States
  const [currentState, setCurrentState] = useState(""); // State to track current module state
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor element

  //# -> Error states
  const [errorsState, setErrorsState] = useState({ state: "" });

  //# -> Predefined states
  const availableStates = ["In Progress", "Approved", "Failed", "Pending"];

  // ^ -----> Load the current state from the active module when the component mounts or activeModule changes
  useEffect(() => {
    if (activeModule?.state) {
      setCurrentState(activeModule.state);
    }
  }, [activeModule]);

  // ^ -----> Handle menu opening and closing
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // ^ -----> Handle state change
  const handleStateChange = async (newState) => {
    if (newState !== currentState) {
      setCurrentState(newState);

      //* ---> Update the global state
      const newInfoModule = { state: newState };
      await handleUpdateModule(setModules, setErrorsState, setActiveModule, modules, activeModule, newInfoModule);
    }
    handleMenuClose();
  };

  return (
    <Box>
      {/* Errors */}
      {errorsState.state && <SmoothAlert severity="error" message={errorsState.state} />}

      {/* Chip displaying the current state */}
      <Chip
        label={currentState || "No State"}
        onClick={handleMenuOpen}
        variant="outlined"
        sx={{ borderColor: activeModule.color, color: activeModule.color, cursor: "pointer" }}
      />

      {/* Menu for selecting the state */}
      <Menu classes={{ paper: "menuNeutral" }} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {availableStates.map((state) => (
          <MenuItem
            sx={{ color: '#ADBEFF',
              "&:hover": { backgroundColor: activeModule.color, color: "var(--color-secondary)", boxShadow: `0px 5px 25px ${activeModule.color}50`
              }
            }}
            key={state}
            onClick={() => handleStateChange(state)}
            disabled={state === currentState}>
            {state}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ModuleState;
