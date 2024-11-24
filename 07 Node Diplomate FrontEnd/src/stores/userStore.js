import { create } from 'zustand';

const TOKEN_KEY = "TOKEN";
// ^ --------------> Token key for local storage
const useUserStore = create((set) => ({
  user: null,
  userToken: window.localStorage.getItem(TOKEN_KEY) || null,
  setUser: (user) => set({ user }),
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
}));

export default useUserStore;
