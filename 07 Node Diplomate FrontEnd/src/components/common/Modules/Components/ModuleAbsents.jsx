import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tooltip, Card, CardContent, Typography, IconButton, FormHelperText, Stack } from "@mui/material";
import { Trash, CalendarDot, Plus, Pencil, CalendarX, Hash, X, Check } from "@phosphor-icons/react";
import useUserStore from "../../../../stores/userStore";
import handleCreateAbsent from "../Absents/createAbsent";
import handleDeleteAbsent from "../Absents/deleteAbsent";
import handleUpdateAbsent from "../Absents/updateAbsent";
import dayjs from "dayjs";

// ? ------------------ ModuleAbsents Logic ------->
const ModuleAbsents = () => {
  const { activeModule, setModules, modules, setActiveModule } = useUserStore();

  // -> State for modal and new absent data
  const [modalOpen, setModalOpen] = useState(false);
  const [newAbsent, setNewAbsent] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    reason: "",
  });

  // -> State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editAbsentId, setEditAbsentId] = useState(null);

  // -> Error state
  const [errors, setErrors] = useState({ absent: "" });

  // -> Handle modal open and close
  const handleModalOpen = () => {
    setIsEditing(false);
    setNewAbsent({
      date: dayjs().format("YYYY-MM-DD"),
      reason: "",
    });
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  // ^ -----> Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAbsent((prev) => ({ ...prev, [name]: value }));
  };

  // ^ -----> Handle submit
  const handleSave = async () => {
    if (!newAbsent.date || !newAbsent.reason) {
      setErrors({ absent: "Please provide all the absent information." });
      return;
    }

    //% -----> If we are editing an absent
    if (isEditing) {
      const newAbsentInfo = { ...newAbsent, absenceNumber: newAbsent.absenceNumber };
      await handleUpdateAbsent(setActiveModule, setModules, modules, setErrors, newAbsentInfo, editAbsentId, activeModule);
    }

    //% -----> If we are creating a new absent
    else {
      const absenceNumber = activeModule.absents.length + 1;
      const absentInfo = { ...newAbsent, absenceNumber };
      await handleCreateAbsent(setModules, setErrors, setActiveModule, modules, activeModule, absentInfo);
    }
    handleModalClose();
  };

  // ^ -----> Handle delete
  const handleDelete = (_id) => {
    const updatedAbsents = activeModule.absents.filter((absent) => absent._id !== _id);
    const updatedModule = { ...activeModule, absents: updatedAbsents };
    setActiveModule(updatedModule);
    handleDeleteAbsent(setModules, setErrors, setActiveModule, modules, activeModule, _id, activeModule);
  };

  // ^ -----> Handle edit
  const handleEdit = (_id) => {
    const absentToEdit = activeModule.absents.find((absent) => absent._id === _id);
    setIsEditing(true);
    setEditAbsentId(_id);
    setNewAbsent(absentToEdit);
    setModalOpen(true);
  };

  return (
    <Box>
      {/* ------------ Absent title ------------ */}
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap={1} alignItems="center">
          <CalendarX size={30} />
          <Typography variant="h6">Absents</Typography>
        </Stack>
        <Button variant="outlined" sx={{ minWidth: "30px", height: "30px", padding: 0 }} onClick={handleModalOpen}>
          <Plus size={17} />
        </Button>
      </Stack>

      {/* ------------ Modal------------ */}
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>{isEditing ? "Edit Absent" : "Add Absent"}</DialogTitle>
        <DialogContent>
          <TextField required label="Date" type="date" fullWidth name="date" onChange={handleInputChange} margin="normal" value={dayjs(newAbsent.date).format("YYYY-MM-DD")} />
          <TextField required label="Reason" fullWidth name="reason" value={newAbsent.reason} onChange={handleInputChange} margin="normal" />
          {errors.absent && <FormHelperText error>{errors.absent}</FormHelperText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary" startIcon={<X />}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" startIcon={<Check />}>
            {isEditing ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ------------ Absents list ------------ */}
      <Box display="flex" flexWrap="wrap" gap={2} marginTop={2} padding={2} sx={{ border: 1, borderColor: activeModule.color, borderRadius: 4 }}>
        {activeModule?.absents.length > 0 ? (
          activeModule.absents.map((absent) => (
            <Card key={absent._id} sx={{ padding: 1, width: 120, height: 120, border: 1, borderRadius:4, borderColor: activeModule.color, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {/* -------- Absent year and edit ----- */}
              <CardContent sx={{ padding: 0 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" gap={0.5} alignItems="center">
                    <CalendarDot fontSize="small" />
                    <Typography fontSize={10}>{dayjs(absent.date).format("YYYY")}</Typography>
                  </Stack>
                  <IconButton size="small" color="primary" onClick={() => handleEdit(absent._id)}>
                    <Pencil />
                  </IconButton>
                </Box>
              </CardContent>

              {/* -------- Absent date and reason ----- */}
              <Typography variant="h6" textAlign="center">
                {dayjs(absent.date).format("DD MMM")}
                <Tooltip title={absent.reason}>
                  <Typography variant="body2" noWrap>
                    {absent.reason.length > 15 ? `${absent.reason.substring(0, 15)}...` : absent.reason}
                  </Typography>
                </Tooltip>
              </Typography>

              {/* -------- Absent number and delete ----- */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" alignItems="center">
                  <Hash />
                  {absent.absenceNumber}
                </Typography>
                <IconButton size="small" color="error" onClick={() => handleDelete(absent._id)}>
                  <Trash />
                </IconButton>
              </Box>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ width: "100%", padding: 2 }}>
            No absents
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ModuleAbsents;
