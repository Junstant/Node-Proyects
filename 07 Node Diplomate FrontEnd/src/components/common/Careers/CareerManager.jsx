import React, { useState } from "react";
import { Button, Card, CardContent, IconButton, Typography, Box, TextField } from "@mui/material";
import { Trash, PencilSimple, Plus } from "@phosphor-icons/react";
import useUserStore from "../../../stores/userStore";
import handleCreateCareer from "./createCareer";
import handleDeleteCareer from "./deleteCareer";
import handleUpdateCareer from "./updateCareer";
import ModalPopUp from "../ModalPopUp";
import handleCreateYear from "../Years/createYear";
import handleDeleteYear from "../Years/deleteYear";
import SmoothAlert from "../SmoothAlert";

// ? ------------------ CareerManager Logic ------->
const CareerManager = () => {
  //# --> Get user
  const { user, careers, setCareers, setActiveCareer } = useUserStore();

  //# --> Error states
  const [errorsCareer, setErrorsCareer] = useState({});
  const [errorsYear, setErrorsYear] = useState({});

  //# --> States
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCareer, setCurrentCareer] = useState(null);
  const [newCareerName, setNewCareerName] = useState("");

  // ^ -----> Open the edit career modal
  const handleOpenEditModal = (career) => {
    setCurrentCareer(career);
    setNewCareerName(career.name);
    setModalOpen(true);
  };

  // ^ -----> Edit career
  const handleEditCareer = async () => {
    if (newCareerName.trim()) {
      await handleUpdateCareer(setCareers, setErrorsCareer, currentCareer.id, newCareerName.trim(), careers, setActiveCareer);
      setModalOpen(false);
    } else {
      setErrorsCareer({ edit: "Please provide a valid career name." });
    }
  };

  // ? ------------------ CareerManager Component ------->
  return (
    <Box sx={{ padding: 2 }}>
      {/* Display the error */}
      {errorsCareer.edit && <SmoothAlert severity="error" message={errorsCareer.edit} />}
      {errorsYear.career && <SmoothAlert severity="error" message={errorsYear.career} />}
      {/* --------------- Create ----------- */}
      <Button onClick={() => handleCreateCareer(setCareers, setErrorsCareer, user, careers)}>
        <Plus />
      </Button>
      <Box sx={{ marginTop: 2 }}>
        {careers.map((career) => (
          <Card key={career.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="h6">{career.name}</Typography>
                  {/* ---------------------- Edit career --------------- */}
                  <IconButton onClick={() => handleOpenEditModal(career)}>
                    <PencilSimple />
                  </IconButton>
                </Box>
                {/* ---------------------- Delete career --------------- */}
                <IconButton onClick={() => handleDeleteCareer(setCareers, setErrorsCareer, career.id, user, careers)}>
                  <Trash />
                </IconButton>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                {career.years.map((year) => (
                  <Box key={year.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography>{year.name}</Typography>
                    <IconButton onClick={() => handleDeleteYear(setCareers, setErrorsYear, career.id, year.number, careers)}>
                      <Trash />
                    </IconButton>
                  </Box>
                ))}
                <Button size="small" startIcon={<Plus />} onClick={() => handleCreateYear(setCareers, setErrorsYear, career.id, career, careers)}>
                  Add Year
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <ModalPopUp open={modalOpen} handleClose={() => setModalOpen(false)} title="Edit Career Name" onSubmit={handleEditCareer} submitLabel="Save" cancelLabel="Cancel">
        <TextField
          autoFocus
          margin="dense"
          label="Career Name"
          type="text"
          fullWidth
          value={newCareerName}
          onChange={(e) => setNewCareerName(e.target.value)}
          error={!!errorsCareer.edit}
          helperText={errorsCareer.edit}
        />
      </ModalPopUp>
    </Box>
  );
};

export default CareerManager;
