import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5001/api/links";

const useLinkStore = create((set) => ({
  links: [],
  fetchLinks: async (projectId) => {
    const response = await axios.get(API_URL, {
      params: projectId ? { projectId } : {},
    });
    set({ links: response.data });
  },
  createLink: async (link) => {
    const response = await axios.post(API_URL, link);
    set((state) => ({ links: [response.data, ...state.links] }));
  },
  updateLink: async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    set((state) => ({
      links: state.links.map((link) =>
        link._id === id ? response.data : link
      ),
    }));
  },
  deleteLink: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    set((state) => ({
      links: state.links.filter((link) => link._id !== id),
    }));
  },
}));

export default useLinkStore;
