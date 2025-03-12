import { create } from "zustand";
import axios from "axios";

const APi_URL = "http://localhost:5001";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("extension_user")) || null,
  loading: false,
  error: null,
  lastChecked: null,

  checkAuthStatus: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${APi_URL}/auth/status`);
      if (response.data.isAuthenticated) {
        localStorage.setItem(
          "extension_user",
          JSON.stringify(response.data.user)
        );
        set({
          user: response.data.user,
          loading: false,
          error: null,
          lastChecked: Date.now(),
        });
        return true;
      } else {
        localStorage.removeItem("extension_user");
        set({ user: null, loading: false, error: null });
        return false;
      }
    } catch (error) {
      localStorage.removeItem("extension_user");
      set({ user: null, loading: false, error: error.message });
      return false;
    }
  },

  logout: async () => {
    try {
      await axios.get(`${APi_URL}/auth/logout`);
      localStorage.removeItem("extension_user");
      set({ user: null });
    } catch (error) {
      localStorage.removeItem("extension_user");
      console.error("Logout error:", error);
      set({ user: null });
    }
  },
}));

export default useAuthStore;
