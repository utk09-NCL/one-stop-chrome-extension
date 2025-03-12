import { create } from "zustand";
import axios from "axios";

const APi_URL = "http://localhost:5001";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,

  checkAuthStatus: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${APi_URL}/auth/status`);
      if (response.data.isAuthenticated) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        set({ user: response.data.user, loading: false, error: null });
        return true;
      } else {
        localStorage.removeItem("user");
        set({ user: null, loading: false, error: null });
        return false;
      }
    } catch (error) {
      localStorage.removeItem("user");
      set({ user: null, loading: false, error: error.message });
      return false;
    }
  },

  logout: async () => {
    try {
      await axios.get(`${APi_URL}/auth/logout`);
      localStorage.removeItem("user");
      set({ user: null });
    } catch (error) {
      localStorage.removeItem("user");
      console.error("Logout error:", error);
      set({ user: null });
    }
  },
}));

export default useAuthStore;
