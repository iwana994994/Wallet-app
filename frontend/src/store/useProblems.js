import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useProblems = create((set) => ({
  problems: [],
  isLoading: false,
  error: null,

  fetchProblems: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/api/problems/all");
      set({ problems: response.data });
       console.log("response",response.data);
        


    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
