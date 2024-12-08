import React, { useState } from "react";
import { Button, IconButton, Typography, Box, TextField, Tooltip } from "@mui/material";
import { Trash, Plus, NotePencil } from "@phosphor-icons/react";
import useUserStore from "../../../stores/userStore";
import handleCreateCareer from "./createCareer";
import handleDeleteCareer from "./deleteCareer";
import handleUpdateCareer from "./updateCareer";
import ModalPopUp from "../ModalPopUp";
import handleCreateYear from "../Years/createYear";
import handleDeleteYear from "../Years/deleteYear";
import SmoothAlert from "../SmoothAlert";
import "../../../assets/styles/global.css";
import "../../../assets/styles/careerManager.css";
import themeNew from "../../../assets/styles/Theme";
import { ThemeProvider } from "@mui/material/styles";

// ? ------------------ CareerManager Logic ------->
const CareerManager = () => {
  //# --> Get user
  const { user, careers, setCareers, setActiveCareer, activeCareer, setActiveYear, activeYear, setActiveModule } = useUserStore();

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

      //if amount of characters greater than 40 then show error
      if (newCareerName.trim().length > 40) {
        setErrorsCareer({ edit: "Career name must be less than 40 characters." });
        return;
      }

      await handleUpdateCareer(setCareers, setErrorsCareer, currentCareer.id, newCareerName.trim(), careers, setActiveCareer);
      setModalOpen(false);
    } else {
      setErrorsCareer({ edit: "Please provide a valid career name." });
    }
  };

  // ? ------------------ CareerManager Component ------->
  return (
    <Box sx={{ padding: 2 }} className="heroCareerManager">
      {/* Display the error */}
      {errorsCareer.edit && <SmoothAlert severity="error" message={errorsCareer.edit} />}
      {errorsYear.career && <SmoothAlert severity="error" message={errorsYear.career} />}
      {/* --------------- Create ----------- */}
      <ThemeProvider theme={themeNew}>
        <div className="flex flex-row justify-between items-center">
          <Typography variant="h5">Careers</Typography>
          <Tooltip title="Create Career" placement="top">
            <Button className="clickMini" onClick={() => handleCreateCareer(setCareers, setErrorsCareer, user, careers)}>
              <Plus />
            </Button>
          </Tooltip>
        </div>
        <Box sx={{ marginTop: 2 }}>
          {careers.map((career) => (
            <section key={career.id} sx={{ marginBottom: 2 }}>
              <div className="cardCareers">
                <Box className="w-full flex flex-wrap flex-row items-center justify-between">
                  <Typography className="text-sm break-all">{career.name}</Typography>
                  <Box className="w-fit flex flex-row justify-end">
                    {/* ---------------------- Edit career --------------- */}
                    <Tooltip title="Edit Career" placement="top">
                      <IconButton onClick={() => handleOpenEditModal(career)}>
                        <NotePencil />
                      </IconButton>
                    </Tooltip>
                    {/* ---------------------- Delete career --------------- */}
                    <Tooltip title="Delete Career" placement="top">
                      <IconButton onClick={() => handleDeleteCareer(setCareers, setErrorsCareer, career.id, user, careers, setActiveCareer, activeCareer, setActiveModule, setActiveYear)}>
                        <Trash />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Box className="w-full mt-4">
                  {career.years.map((year) => (
                    <Box key={year.id} className="flex flex-row w-full justify-between items-center border-b border-strokeT">
                      <Typography>{year.name}</Typography>
                      <Tooltip title="Delete Year" placement="top">
                        <IconButton onClick={() => handleDeleteYear(setCareers, setErrorsYear, career.id, year.number, careers, setActiveCareer, setActiveYear, activeYear, setActiveModule)}>
                          <Trash />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ))}
                  <Button size="small" className="addYear" startIcon={<Plus />} onClick={() => handleCreateYear(setCareers, setErrorsYear, career.id, career, careers, setActiveCareer)}>
                    Add Year
                  </Button>
                </Box>
              </div>
            </section>
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
      </ThemeProvider>
    </Box>
  );
};

export default CareerManager;
