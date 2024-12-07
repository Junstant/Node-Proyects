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
            //change the color of the iconButton inside the text field when error
            "&.Mui-error .MuiIconButton-root": {
              color: "#ff5959", // Icon color on error
            },

            "&.Mui-error .MuiInputBase-input": {
              color: "#ff5959", // Input text color on error
            },
            "& .MuiFormLabel-root.Mui-error": {
              color: "#ff5959", // Cambia el color del label en error
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
          "&.Mui-error": {
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

    MuiButton: {
      styleOverrides: {
        root: {
          // ^ ----------- Button click mini ------------>
          "&.clickMini": {
            background: "#43A4FF", // Button text color
            color: "white", // Button text color
            padding: "10px", // Button padding
            minWidth: "auto", // Button width
            boxShadow: "var(--shadowBlue)", // Button box shadow
            "&:hover": {
              color: "var(--color-tertiary)", // Button text color on hover
              backgroundColor: "#84C3FF", // Button background color on hover
            },
            "&:disabled": {
              backgroundColor: "var(--color-tertiary)", // Button background color
              color: "#6D7AAD", // Button text color
              boxShadow: "none", // Button box shadow
            },
          },

          // ^ ----------- Button click mini delete ------------>
          "&.clickMiniDelete": {
            background: "rgba(35, 41, 63, 1)", // Button text color
            color: "var(--color-quaternary)", // Button text color
            padding: "10px", // Button padding
            minWidth: "auto", // Button width
            border: "none",
            "&:hover": {
              color: "var(--color-tertiary)", // Button text color on hover
              backgroundColor: "#ff43c0", // Button background color on hover
              boxShadow: "var(--shadowPink)", // Button box shadow
            },
            "&:disabled": {
              backgroundColor: "var(--color-tertiary)", // Button background color
              color: "#6D7AAD", // Button text color
              boxShadow: "none", // Button box shadow
            },
          },

          // ^ ----------- Button click mini gray ------------>
          "&.clickMiniGray": {
            background: "rgba(35, 41, 63, 1)", // Button text color
            color: "var(--color-quaternary)", // Button text color
            padding: "10px", // Button padding
            minWidth: "auto", // Button width
            border: "none",
            "&:hover": {
              color: "var(--color-tertiary)", // Button text color on hover
              backgroundColor: "var(--color-quaternary)", // Button background color on hover
            },
          },

          // ^ ----------- Button day neutral color ------------>
          "&.btnNeutral": {
            minWidth: "auto", // Button width
            "&:hover": {
              backgroundColor: "rgba(109, 122, 173, 0.2)", // Button background color on hover
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

          // ^ ----------- Icon Button click mini ------------>
          "&.iconBtnMini": {
            color: "var(--color-quaternary)", // Button text color
            minWidth: "auto", // Button width
            "&:hover": {
              backgroundColor: "rgba(109, 122, 173, 0.3)", // Button background color on hover
            },
          },
        },
      },
    },

    // ^ ----------- Input Adornment ------------>
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          //# -> Normal
          "& .MuiIconButton-root": {
            color: "var(--color-primary)", // Icon color
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

          "&.MuiMultiSectionDigitalClockSection-root::after": {
            content: "none",  
            height: "auto",
          },
        },
      },
    },

    // ^ ----------- Mui Tooltip ------------>
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#43A4FF", // Default background color
          color: "#FFFFFF", // Default text color
          borderRadius: "10px", // Rounded border
          boxShadow: "var(--shadowBlue)",
        },
        // Clase para aplicar estilos específicos
        popper: {
          "&.tooltipGray .MuiTooltip-tooltip": {
            backgroundColor: "var(--color-tertiary)", // Gray background
            color: "#FFFFFF", // Text color
            boxShadow: "none",
          },
        },
      },
    },

    // ^ ----------- Mui Pickers Popper ------------>
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          color: "#FFFFFF", // Text
          backgroundColor: "rgba(35, 41, 63, 0.6)", // Background color
          borderRadius: "10px", // Rounded border
          border: "1px solid #43A4FF", // Border color
          backdropFilter: "blur(10px)",
        },
      },
    },

    // ^ ----------- Mui Pickers Toolbar ------------>
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "10px", // Padding
          transition: "0.2s", // Transition

          "&.Mui-selected": {
            boxShadow: "var(--shadowBlue)", // Box shadow
            backgroundColor: "#43A4FF", // Background color
          },

          "&.Mui-selected:hover": {
            boxShadow: "var(--shadowBlue)", // Box shadow
            backgroundColor: "#43A4FF", // Background color
          },

          "&:hover": {
            backgroundColor: "#43A4FF", // Background color
            boxShadow: "var(--shadowBlue)", // Box shadow
          },

          "&.MuiMultiSectionDigitalClockSection-item": {
            color: "#fff", // Text color
            borderRadius: "5px", // Rounded border
          },
          "&.MuiMultiSectionDigitalClockSection-item:hover": {
            backgroundColor: "var(--color-primary)", // Fondo del item
            color: "#fff", // Color del texto
            borderRadius: "5px", // Rounded border
          },
        },
      },
    },

    // ^ ----------- Mui Select ------------>
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "var(--color-primary)", // Icon color
        },
      },
    },
  },
});

export default themeNew;
