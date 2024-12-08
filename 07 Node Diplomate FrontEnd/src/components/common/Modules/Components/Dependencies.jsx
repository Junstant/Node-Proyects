import React, { useState, useEffect } from "react";
import useUserStore from "../../../../stores/userStore";
import { Button, Menu, MenuItem, Chip, Stack, Box, FormHelperText, Tooltip } from "@mui/material";
import { FlowArrow, Plus, XCircle } from "@phosphor-icons/react";
import handleUpdateModule from "../updateModule";
import "../../../../assets/styles/global.css";
import themeNew from "../../../../assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import SmoothAlert from "../../SmoothAlert";

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
    else {
      setSelectedDependencies([]);
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
      {errorsDependencies.dependencies && <SmoothAlert type="error" message={errorsDependencies.dependencies} />}

      <ThemeProvider theme={themeNew}>

        {/* # -> Dependencies title */}
        <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction="row" spacing={1} alignItems={"center"} color={activeModule.color}>
            <FlowArrow size={25} />
            <h6 className="text-xl">Dependencies:</h6>
          </Stack>

          {/* # -> Add a new dependency */}
          <Tooltip PopperProps={{ className: "tooltipGray" }} title="Add a new dependency">
            <Button
              variant="outlined"
              disabled={modules.filter((module) => module._id !== activeModule._id && !selectedDependencies.some((dep) => dep._id === module._id)).length === 0}
              onClick={handleMenuOpen}
              sx={{
                minWidth: "30px",
                height: "30px",
                padding: 0,
                color: activeModule.color,
                borderColor: activeModule.color,
                ":hover": { backgroundColor: activeModule.color, color: "var(--color-secondary)" },
              }}
            >
              <Plus size={17} />
            </Button>
          </Tooltip>
        </Stack>
        {errorsDependencies.dependencies && <FormHelperText error>{errorsDependencies.dependencies}</FormHelperText>}

        {/* # -> Show the dependencies */}
        <div className="flex flex-row gap-3 border border-strokeT p-4 mt-2 text-quaternary rounded-xl flex-wrap">
          {selectedDependencies.length > 0 ? (
            selectedDependencies.map((module) => (
              <Chip
                key={module._id}
                label={module.name}
                deleteIcon={<XCircle />}
                onDelete={() => handleDelete(module._id)}
                variant="outlined"
                sx={{
                  borderColor: module.color,
                  color: module.color,
                  ":hover": {
                    backgroundColor: module.color,
                    color: "var(--color-secondary)",
                    boxShadow: `0 0 30px ${module.color}80`,
                  },
                  "& .MuiChip-deleteIcon": {
                    color: module.color,
                    transition: "color 0.3s",
                  },
                  ":hover .MuiChip-deleteIcon": {
                    color: "var(--color-secondary)",
                  },
                }}
              />
            ))
          ) : (
            <Box>No dependencies</Box>
          )}
          {/* # -> Add a new dependency */}
        </div>

        {/* # -> Menu to select the dependencies */}
        <Menu classes={{ paper: "menuNeutral" }} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {modules
            .filter((module) => module._id !== activeModule._id)
            .map((module) => (
              <MenuItem
                className="neutralMenuItem"
                key={module._id}
                onClick={() => handleAddDependency(module._id)}
                disabled={selectedDependencies.some((dep) => dep._id === module._id)}
                sx={{
                  margin: "5px",
                  borderRadius: "5px",
                  color: module.color,

                  ":hover": { backgroundColor: module.color, color: "var(--color-secondary)", boxShadow: `0 0 30px ${module.color}80` },
                  ...(selectedDependencies.some((dep) => dep._id === module._id) && { backgroundColor: "var(--color-secondary)", color: "var(--color-quaternary)" }),
                }}
              >
                {module.name}
              </MenuItem>
            ))}
        </Menu>
      </ThemeProvider>
    </Box>
  );
};

export default Dependencies;
