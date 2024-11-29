import React, { useState, useEffect } from "react";
import useUserStore from "../../../../stores/userStore";
import { Button, Menu, MenuItem, Chip, Stack, Box, FormHelperText, Typography } from "@mui/material";
import { FlowArrow, Plus } from "@phosphor-icons/react";
import handleUpdateModule from "../updateModule";

const Dependencies = () => {
  //# -> Get the modules from the global state
  const { modules, activeModule, setModules, setActiveModule } = useUserStore();

  //# -> States
  const [selectedDependencies, setSelectedDependencies] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  //# -> Error states
  const [errorsDependencies, setErrorsDependencies] = useState({ dependencies: "" });

  // ^ -----> Load existing dependencies on component mount
  useEffect(() => {
    if (activeModule?.dependencies?.length > 0) {
      // Set dependencies directly from the activeModule
      setSelectedDependencies(activeModule.dependencies);
    }
  }, [activeModule]); // Runs when activeModule changes

  // ^ -----> Open and close the menu
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // ^ -----> Add a new dependency
  const handleAddDependency = async (moduleId) => {
    const module = modules.find((mod) => mod._id === moduleId);
    if (module && !selectedDependencies.some((dep) => dep._id === moduleId)) {
      const updatedDependencies = [...selectedDependencies, module];
      setSelectedDependencies(updatedDependencies);

      //* ---> Update the global state
      const newInfoModule = { dependencies: updatedDependencies };
      await handleUpdateModule(setModules, setErrorsDependencies, setActiveModule, modules, activeModule, newInfoModule);
    }
    handleMenuClose();
  };

  // ^ -----> Delete a dependency
  const handleDelete = async (moduleId) => {
    //* ---> Update the local state
    const updatedDependencies = selectedDependencies.filter((dep) => dep._id !== moduleId);
    setSelectedDependencies(updatedDependencies);

    //* ---> Update the global state
    const newInfoModule = { dependencies: selectedDependencies.filter((dep) => dep._id !== moduleId) };
    await handleUpdateModule(setModules, setErrorsDependencies, setActiveModule, modules, activeModule, newInfoModule);
  };

  // ? ------------------ Dependencies Component ------->

  return (
    <Box>
      {/* Error alerts */}
      <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <FlowArrow size={30} />
          <Typography variant="h6">Dependencies:</Typography>
        </Stack>
        <Button
          variant="outlined"
          disabled={modules.filter((module) => module._id !== activeModule._id && !selectedDependencies.some((dep) => dep._id === module._id)).length === 0}
          onClick={handleMenuOpen}
          sx={{ minWidth: "30px", height: "30px", padding: 0 }}
        >
          <Plus size={17} />
        </Button>
      </Stack>
      {errorsDependencies.dependencies && <FormHelperText error>{errorsDependencies.dependencies}</FormHelperText>}

      {/* # -> Show the dependencies */}
      <Stack direction="row" spacing={1}>
        {selectedDependencies.length > 0 ? (
          selectedDependencies.map((module) => (
            <Chip key={module._id} label={module.name} onDelete={() => handleDelete(module._id)} variant="outlined" sx={{ borderColor: module.color, color: module.color }} />
          ))
        ) : (
          <Box>No dependencies</Box>
        )}
        {/* # -> Add a new dependency */}
      </Stack>

      {/* # -> Menu to select the dependencies */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {modules
          .filter((module) => module._id !== activeModule._id)
          .map((module) => (
            <MenuItem key={module._id} onClick={() => handleAddDependency(module._id)} disabled={selectedDependencies.some((dep) => dep._id === module._id)}>
              {module.name}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default Dependencies;
