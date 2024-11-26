import React, { useState } from "react";
import { FormControl, Input, InputAdornment, InputLabel, FormHelperText, Button, IconButton } from "@mui/material";
import { Eye, EyeClosed, Info } from "@phosphor-icons/react";
import { usePasswordVisibility } from "../../hooks/passwordSwitch";
import createHandleChange from "../../hooks/formHandlers";
import handleSubmitUpdate from "../../Screens/UserPanel/updateUser";
import useUserStore from "../../stores/userStore";

// ? ------------------ UpdateForm Logic ------->
const UpdateForm = () => {
  const { user } = useUserStore();

  // # -> States to manage form values
  const [valuesUpdate, setValuesUpdate] = useState({ name: user.name, email: user.email, oldPassword: "", newPassword: "" });

  // # -> States to manage form errors
  const [errorsUpdate, setErrorsUpdate] = useState({});

  // Custom hooks para manejar cambios y visibilidad de contraseña
  const { showPassword, togglePasswordVisibility, handleMouseDown, handleMouseUp } = usePasswordVisibility();
  const handleChangeUpdate = createHandleChange(setValuesUpdate);


  // ? ------------------ UpdateForm Component ------->
  return (
    <form onSubmit={(e) => handleSubmitUpdate(e, valuesUpdate, setErrorsUpdate, user)}>
      {/* Nombre */}
      <div>
        <FormControl variant="standard">
          <InputLabel htmlFor="update-name">Name:</InputLabel>
          <Input id="update-name" name="name" type="text" placeholder="John" value={valuesUpdate.name} onChange={handleChangeUpdate} required autoComplete="name" />
          <FormHelperText>{errorsUpdate.name && <label className="error">{errorsUpdate.name}</label>}</FormHelperText>
        </FormControl>
      </div>

      {/* Email */}
      <div>
        <FormControl variant="standard" disabled>
          <InputLabel htmlFor="update-email">Email:</InputLabel>
          <Input id="update-email" name="email" type="email" value={valuesUpdate.email} disabled autoComplete="email" />
        </FormControl>
      </div>

      {/* Contraseña actual */}
      <div>
        <FormControl variant="standard">
          <InputLabel htmlFor="update-old-password">Old Password:</InputLabel>
          <Input
            id="update-old-password"
            name="oldPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Old password"
            value={valuesUpdate.oldPassword}
            onChange={handleChangeUpdate}
            required
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeClosed /> : <Eye />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{errorsUpdate.oldPassword && <label className="error">{errorsUpdate.oldPassword}</label>}</FormHelperText>
        </FormControl>
      </div>

      {/* Nueva contraseña */}
      <div>
        <FormControl variant="standard">
          <InputLabel htmlFor="update-new-password">New Password:</InputLabel>
          <Input
            id="update-new-password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={valuesUpdate.newPassword}
            onChange={handleChangeUpdate}
            required
            autoComplete="new-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeClosed /> : <Eye />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{errorsUpdate.newPassword && <label className="error">{errorsUpdate.newPassword}</label>}</FormHelperText>
        </FormControl>
      </div>

      {/* Botón de actualizar */}
      <Button type="submit" variant="contained" startIcon={<Info />}>
        Update
      </Button>
      {errorsUpdate.general && <p className="error general">{errorsUpdate.general}</p>}
    </form>
  );
};

export default UpdateForm;
