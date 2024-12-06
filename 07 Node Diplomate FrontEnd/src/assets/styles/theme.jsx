import { createTheme } from "@mui/material/styles";

const themeNew = createTheme({
  palette: {
    primary: {
      main: "#43AFFF", // Main color
      contrastText: "#FFFFFF", // Text color
    },
  },
  components: {
    // ^ ----------- TextField ------------>
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#3F4767", // Default border color
              borderRadius: "10px", // Rounded border
            },

            "&:hover fieldset": {
              borderColor: "#43A4FF", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#43A4FF", // Border color on focus
            },
            "&.Mui-error fieldset": {
              borderColor: "#ff5959", // Border color on error
            },
            "& .MuiInputAdornment-root": {
              color: "#6D7AAD", // Icon color
            },
            "&.Mui-disabled fieldset": {
              borderColor: "#292E44", // Border color on focus
            },
          },
          "& .MuiInputLabel-root": {
            color: "#6D7AAD", // Label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#6D7AAD", // Label color on focus
          },
          "& .MuiInputLabel-root.Mui-error": {
            color: "#ff5959", // Label color on error
          },
          "& .MuiInputBase-input": {
            color: "white", // Input text color
          },
          // ^ ---------> disabled input styles
          "&:disabled": {
            backgroundColor: "#3F4767", // Background color
          },
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#3F4767", // Disabled input text color
          },
        },
      },

      // ^ ----------- Button ------------>
      MuiButton: {
        styleOverrides: {
          root: {
            color: "white", // Button text color
          },
          "& .MuiIconButton-root": {
            background: "#6D7AAD", // Button text color
          },
        },
      },
    },

    // ^ ----------- Button click mini ------------>
    MuiButton: {
      styleOverrides: {
        root: {
          "&.clickMini": {
            background: "#43A4FF", // Button text color
            color: "white", // Button text color
            padding: "10px", // Button padding
            minWidth: "auto", // Button width
            boxShadow: "var(--shadowBlue)", // Button box shadow
            "&:hover": {
              backgroundColor: "#84C3FF", // Button background color on hover
            },
          },
        },
      },
    },

    // ^ ----------- Icon Button ------------>
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#6D7AAD", // Button text color
          "&:hover": {
            backgroundColor: "rgba(67, 164, 255, 0.2)", // Button background color on hover
          },
        },
      },
    },

    // ^ ----------- Input Adornment ------------>
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          "& .MuiIconButton-root": {
            color: "#43A4FF", // Icon color
          },
        },
      },
    },

    // ^ ----------- Mui menu ------------>
    MuiMenu: {
      styleOverrides: {
        paper: {
          color: "#FFFFFF", // Text color
          backgroundColor: "rgba(35, 41, 63, 0.6)", // Background color
          borderRadius: "10px", // Rounded border
          border: "1px solid #43A4FF", // Border color
          backdropFilter: "blur(10px)",
        },
      },
    },

    // ^ ----------- MuiMenu-list ------------>
    MuiList: {
      styleOverrides: {
        root: {
          padding: "0px", // List padding
        },
      },
    },

    // ^ ----------- Mui MenuItem ------------>
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "20px 15px", // Item padding
          margin: "0px",

          "&.active": {
            backgroundColor: "#43A4FF", // Active item background color
            boxShadow: "var(--shadowBlue)", // Active item box shadow
          },

          "&:hover": {
            backgroundColor: "#43A4FF", // Item background color on hover
            boxShadow: "var(--shadowBlue)", // Box shadow on hover
          },
        },
      },
    },

    // ^ ----------- Mui Tooltip ------------>
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#43A4FF", // Background color
          color: "#FFFFFF", // Text color
          borderRadius: "10px", // Rounded border
          boxShadow: "var(--shadowBlue)",
        },
      },
    },
  },
});

export default themeNew;
