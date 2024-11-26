import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, IconButton, Typography, Box } from "@mui/material";
import { Trash, PencilSimple, Plus } from "@phosphor-icons/react";
import { addYearToCareer, updateCareerName, deleteYearFromCareer } from "../../../utils/careerHelper.utils";
import useUserStore from "../../../stores/userStore";
import handleCreateCareer from "./createCareer";
import getCareers from "./getCareers";

const CareerManager = () => {
  // # -> Get the user from the store
  const { user } = useUserStore();

  // # -> Error states
  const [errorsCareer, setErrorsCareer] = useState({});

  // * -----> New career state
  const [careers, setCareers] = useState([]);

  // ? -----> Load the careers when the page is loaded
  useEffect(() => {
    getCareers(setCareers, setErrorsCareer, user);
  }, [user]);

  // ^ ---------> Add a year to a career
  const handleAddYear = (careerId) => {
    setCareers((prev) => prev.map((career) => (career.id === careerId ? addYearToCareer(career) : career)));
  };

  // ^ ---------> Update the name of a career
  const handleUpdateCareer = (id, newName) => {
    setCareers((prev) => prev.map((career) => (career.id === id ? updateCareerName(career, newName) : career)));
  };

  // ^ ---------> Delete a career
  const handleDeleteCareer = (id) => {
    setCareers(careers.filter((career) => career.id !== id));
  };

  // ^ ---------> Delete a year from a career
  const handleDeleteYear = (careerId, yearId) => {
    setCareers((prev) => prev.map((career) => (career.id === careerId ? deleteYearFromCareer(career, yearId) : career)));
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* ------------- Add career ------------- */}
      <Button onClick={() => handleCreateCareer(setCareers, setErrorsCareer, user)}> 
        <Plus />
      </Button>
      <Box sx={{ marginTop: 2 }} key={careers.id}>
        {careers.map((career) => (
          <Card key={career.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="h6">{career.name}</Typography>
                  <IconButton
                    onClick={() => {
                      const newName = prompt("New career name:", career.name);
                      if (newName) handleUpdateCareer(career.id, newName);
                    }}
                  >
                    <PencilSimple />
                  </IconButton>
                </Box>
                <IconButton onClick={() => handleDeleteCareer(career.id)}>
                  <Trash />
                </IconButton>
              </Box>

              {/* List of years */}
              <Box sx={{ marginTop: 2 }}>
                {career.years.map((year) => (
                  <Box key={year.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                    <Typography>{year.name}</Typography>
                    <IconButton onClick={() => handleDeleteYear(career.id, year.id)}>
                      <Trash />
                    </IconButton>
                  </Box>
                ))}
                <Button size="small" startIcon={<Plus />} onClick={() => handleAddYear(career.id)}>
                  Add Year
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CareerManager;
