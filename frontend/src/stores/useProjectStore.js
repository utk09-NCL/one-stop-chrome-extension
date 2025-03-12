import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5001/api/projects";

axios.defaults.withCredentials = true;

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ projects: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({
        error:
          error.response?.status === 401
            ? "Authentication required"
            : "Failed to fetch projects",
        loading: false,
      });

      if (error.response?.status === 401) {
        window.location.href = "/auth";
      }
    }
  },

  createProject: async (project) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(API_URL, project);
      set((state) => ({
        projects: [response.data, ...state.projects],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      set({
        error:
          error.response?.status === 401
            ? "Authentication required"
            : "Failed to create project",
        loading: false,
      });
      return null;
    }
  },

  updateProject: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      set((state) => ({
        projects: state.projects.map((proj) =>
          proj._id === id ? response.data : proj
        ),
        loading: false,
      }));
      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      set({
        error:
          error.response?.status === 401
            ? "Authentication required"
            : "Failed to update project",
        loading: false,
      });
      return null;
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        projects: state.projects.filter((proj) => proj._id !== id),
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      set({
        error:
          error.response?.status === 401
            ? "Authentication required"
            : "Failed to delete project",
        loading: false,
      });
      return false;
    }
  },
}));

export default useProjectStore;
