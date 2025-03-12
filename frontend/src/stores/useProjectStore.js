import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5001/api/projects";

axios.defaults.withCredentials = true;

const useProjectStore = create((set) => ({
  projects: [],
  fetchProjects: async () => {
    const response = await axios.get(API_URL);
    set({ projects: response.data });
  },
  createProject: async (project) => {
    const response = await axios.post(API_URL, project);
    set((state) => ({ projects: [response.data, ...state.projects] }));
  },
  updateProject: async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    set((state) => ({
      projects: state.projects.map((proj) =>
        proj._id === id ? response.data : proj
      ),
    }));
  },
  deleteProject: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    set((state) => ({
      projects: state.projects.filter((proj) => proj._id !== id),
    }));
  },
}));

export default useProjectStore;
