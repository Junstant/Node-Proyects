import React, { useState, useEffect } from "react";
import { Chip, Menu, MenuItem, Box } from "@mui/material";
import useUserStore from "../../../../stores/userStore";
import handleUpdateModule from "../updateModule";

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
      {errorsState.state && <FormHelperText error>{errorsState.state}</FormHelperText>}

      {/* Chip displaying the current state */}
      <Chip
        label={currentState || "No State"}
        onClick={handleMenuOpen}
        variant="outlined"
        sx={{ borderColor: activeModule.color, color: activeModule.color, cursor: "pointer" }}
      />

      {/* Menu for selecting the state */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {availableStates.map((state) => (
          <MenuItem
            key={state}
            onClick={() => handleStateChange(state)}
            disabled={state === currentState} // Disable the current state to prevent redundant updates
          >
            {state}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ModuleState;
