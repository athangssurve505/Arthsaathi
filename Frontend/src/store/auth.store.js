import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  showSessionExpired:false,

  login: (user, accessToken) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),

  setAccessToken: (accessToken) =>
    set({
      accessToken,
    }),

  setUser:(user)=>{
    set({
      user
    })
  },
  setSessionExpired:(value)=>{
     console.log("Setting session expired:", value);
    set({showSessionExpired: value,})
  }
}));

export default useAuthStore;