import React, { useState } from "react";
import useUserStore from "../../../stores/userStore";
import handleCreateModule from "./createModule";
// import handleDeleteModule from "./deleteModule";
// import handleUpdateModule from "./updateModule";
import { Button, Card, CardContent, IconButton, Typography, Box, TextField } from "@mui/material";
import { Trash, PencilSimple, Plus } from "@phosphor-icons/react";
import ModalPopUp from "../ModalPopUp";
import SmoothAlert from "../SmoothAlert";

// ? ------------------ ModulesManager Logic ------->
const ModulesManager = () => {
  //# --> Get user
  const { user, modules, setModules } = useUserStore();

  //# --> Error states
  const [errorsModule, setErrorsModule] = useState({});

  //# --> States
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [newModuleName, setNewModuleName] = useState("");

  // ^ -----> Open the edit module modal
  const handleOpenEditModal = (module) => {
    setCurrentModule(module);
    setNewModuleName(module.name);
    setModalOpen(true);
  };

  // ^ -----> Edit module

  // ? ------------------ ModulesManager Component ------->
  return (
    <Box>
      {/* Display the errors */}
      {errorsModule.edit && <SmoothAlert severity="error" message={errorsModule.edit} />}
      {/* --------------- Create ----------- */}
      <h4>My modules</h4>
      <Button onClick={() => handleCreateModule(setModules, user, modules)}>
        <Plus />
      </Button>
      <Box sx={{ marginTop: 2 }}>
        {modules.map((module) => (
          <Card key={module.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="h6">{module.name}</Typography>
                  <IconButton onClick={() => handleOpenEditModal(module)}>
                    <PencilSimple />
                  </IconButton>
                </Box>
                <IconButton onClick={() => handleDeleteModule(setModules, module.id, modules)}>
                  <Trash />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ModulesManager;
