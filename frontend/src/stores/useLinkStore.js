import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5001/api/links";

const useLinkStore = create((set) => ({
  links: [],
  fetchLinks: async () => {
    const response = await axios.get(API_URL);
    set({ links: response.data });
  },
}));

export default useLinkStore;
