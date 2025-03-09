import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5001/api/qas";

const useQAStore = create((set) => ({
  questions: [],
  fetchQuestions: async () => {
    const response = await axios.get(API_URL);
    set({ questions: response.data });
  },
  createQuestion: async (question) => {
    const response = await axios.post(API_URL, question);
    set((state) => ({ questions: [response.data, ...state.questions] }));
  },
  updateQuestion: async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    set((state) => ({
      questions: state.questions.map((quest) =>
        quest._id === id ? response.data : quest
      ),
    }));
  },
  deleteQuestion: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    set((state) => ({
      questions: state.questions.filter((quest) => quest._id !== id),
    }));
  },
}));

export default useQAStore;
