import React, { useState } from "react";
import useUserStore from "../../stores/userStore";
import { useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../../components/layouts/AppHeader";
import { Avatar, Button, Modal, FormControl, IconButton, Checkbox, FormHelperText, Input, InputAdornment, InputLabel } from "@mui/material";
import { Eye, EyeClosed, Info, Trash } from "@phosphor-icons/react";
import { usePasswordVisibility } from "../../hooks/passwordSwitch";
import createHandleChange from "../../hooks/formHandlers";
import SmoothAlert from "../../components/SmoothAlert";
import handleSubmitUpdate from "./updateUser";
import handleSubmitDelete from "./deleteUser";

// ? ------------------ UserPanel Logic ------->
const UserPanel = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  // # -> Custom hook to manage password visibility
  const { showPassword, togglePasswordVisibility, handleMouseDown, handleMouseUp } = usePasswordVisibility();

  // # -> States to manage form values
  const [valuesUpdate, setValuesUpdate] = useState({ name: user.name, email: user.email, oldPassword: "", newPassword: "" });
  const [valuesDelete, setValuesDelete] = useState({ deletePassword: "" });

  // # -> States to manage form errors
  const [errorsUpdate, setErrorsUpdate] = useState({});
  const [errorsDelete, setErrorsDelete] = useState({});

  // # -> Function to handle changes 
  const handleChangeUpdate = createHandleChange(setValuesUpdate);
  const handleChangeDelete = createHandleChange(setValuesDelete);


  // # -> Location hook
  const location = useLocation();
  const alertMessage = location.state?.alertMessage || "";


  // # -> Function to switch the modal visibility
  const [open, setOpen] = useState(false);

  // ? ------------------ UserPanel Component ------->
  return (
    <div>
      <AppHeader />
      {/* Alert */}
      {alertMessage && <SmoothAlert message={alertMessage} severity="error" />}
      <div>
        {/* Left panel */}
        <div>
          {/* Top panel */}
          <div>
            <Avatar src="https://avatar.iran.liara.run/public/41" />
            <h1>{user.name}</h1>
          </div>
          {/* Down panel */}
          <div>
            <h3>My personal information</h3>
            <form onSubmit={(e) => handleSubmitUpdate(e, valuesUpdate, setErrorsUpdate, user)}>
              {/* Name */}
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
                  <Input id="update-email" name="email" type="email" placeholder="example@gmail.com" value={valuesUpdate.email} onChange={handleChangeUpdate} required autoComplete="email" disabled />
                </FormControl>
              </div>
              {/* Password */}
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
                        <IconButton aria-label="toggle password visibility" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={togglePasswordVisibility}>
                          {showPassword ? <EyeClosed /> : <Eye />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errorsUpdate.oldPassword && <label className="error">{errorsUpdate.oldPassword}</label>}</FormHelperText>
                </FormControl>
              </div>

              {/* New Password */}
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
                        <IconButton aria-label="toggle password visibility" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={togglePasswordVisibility}>
                          {showPassword ? <EyeClosed /> : <Eye />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errorsUpdate.newPassword && <label className="error">{errorsUpdate.newPassword}</label>}</FormHelperText>
                </FormControl>
              </div>
              {/* Update button */}
              <Button type="submit" variant="contained" startIcon={<Info />}>
                Update
              </Button>
              {errorsUpdate.general && <p className="error general">{errorsUpdate.general}</p>}
            </form>

            {/* Delete account */}
            <div>
              <h3>Delete account</h3>
              <Button variant="contained" startIcon={<Trash />} onClick={() => setOpen(true)}>
                Delete account
              </Button>
              <Modal open={open} onClose={() => setOpen(false)}>
                <div>
                  <form onSubmit={(e) => handleSubmitDelete(e, valuesDelete, setErrorsDelete, user, navigate)}>
                    <h2>Please enter your password to delete your account</h2>
                    <FormControl>
                      <InputLabel htmlFor="delete-password">Password:</InputLabel>
                      <Input
                        id="delete-password"
                        name="deletePassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        onChange={handleChangeDelete}
                        autoComplete="current-password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={togglePasswordVisibility}>
                              {showPassword ? <EyeClosed /> : <Eye />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText>{errorsDelete.password && <label className="error">{errorsDelete.password}</label>}</FormHelperText>
                    </FormControl>
                    {errorsDelete.general && <p className="error general">{errorsDelete.general}</p>}
                    <Button type="submit" variant="contained" startIcon={<Trash />}>
                      Delete
                    </Button>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        {/* Right panel */}
        <div></div>
      </div>
    </div>
  );
};

export default UserPanel;
