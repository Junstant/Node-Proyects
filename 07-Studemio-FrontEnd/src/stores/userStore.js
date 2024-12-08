import { create } from "zustand";

const TOKEN_KEY = "TOKEN";
const CAREER_KEY = "ACTIVE_CAREER";

// ^ --------------> Token key and active career key for local storage
const useUserStore = create((set) => ({
  user: null,
  activeYear: JSON.parse(window.localStorage.getItem("ACTIVE_YEAR")) || null,
  activeModule: JSON.parse(window.localStorage.getItem("ACTIVE_MODULE")) || null,
  careers: [],
  modules: [],
  activeCareer: JSON.parse(window.localStorage.getItem(CAREER_KEY)) || null,
  userToken: window.localStorage.getItem(TOKEN_KEY) || null,

  // # -> Set the user
  setUser: (user) => set({ user }),

  // # -> Set the list of careers
  setCareers: (careers) => set({ careers }),

  // # -> Set the list of modules
  setModules: (modules) => set({ modules }),

  // # -> Set the active career and persist it to localStorage
  setActiveCareer: (activeCareer) => {
    try {
      if (activeCareer) {
        window.localStorage.setItem(CAREER_KEY, JSON.stringify(activeCareer));
      } else {
        window.localStorage.removeItem(CAREER_KEY);
      }
      set({ activeCareer });
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  },

  // # -> Set the active year
  setActiveYear: (activeYear) => {
    try {
      if (activeYear) {
        window.localStorage.setItem("ACTIVE_YEAR", JSON.stringify(activeYear));
      } else {
        window.localStorage.removeItem("ACTIVE_YEAR");
      }
      set({ activeYear });
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  },

  // # -> Manage the user token
  setUserTokenFunc: (token) => {
    try {
      const currentToken = window.localStorage.getItem(TOKEN_KEY);
      if (currentToken !== token) {
        if (token) {
          window.localStorage.setItem(TOKEN_KEY, token);
        } else {
          window.localStorage.removeItem(TOKEN_KEY);
        }
        set({ userToken: token });
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  },

  // # -> Set the active module
  setActiveModule: (activeModule) => {
    try {
      if (activeModule) {
        window.localStorage.setItem("ACTIVE_MODULE", JSON.stringify(activeModule));
      } else {
        window.localStorage.removeItem("ACTIVE_MODULE");
      }
      set({ activeModule });
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  },
}));

export default useUserStore;
