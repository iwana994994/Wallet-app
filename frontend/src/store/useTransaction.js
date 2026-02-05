import {create} from "zustand"
import axiosInstance from "../lib/axios"    

export const useTransaction = create((set) => ({
    transactions: [],
    isLoading: false,
    error: null,
    amount:null,
    income:null,
    expenses:null,

    createTransaction: async ({type,amount,date}) => {
        try {
          const response = await axiosInstance.post("/api/transactions/create", {type,amount,date});
          return response.data;
         
        } catch (error) {
         set({ error: error.response.data.message }); 
        }
    },
    fetchTransactions: async () => {
        set({ isLoading: true, error: null });
    
        try {
          const response = await axiosInstance.get("/api/transactions/all");
          set({ transactions: response.data });
        } catch (error) {
          set({ error: error.response.data.message });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchTotalAmount:async()=>{
        try {

            const response = await axiosInstance.get("/api/transactions/totalAmount")
            set({amount:response.data})
            
        } catch (error) {
          set({ error: error.response.data.message });
        } finally {
          set({ isLoading: false });
        }
      },
      fetchIncome:async()=>{
         try {

            const response = await axiosInstance.get("/api/transactions/income")
            set({income:response.data.totalIncome})
            
        } catch (error) {
          set({ error: error.response.data.message });
        } finally {
          set({ isLoading: false });
        }
      },
      fetchExpenses:async()=>{
         try {

            const response = await axiosInstance.get("/api/transactions/expenses")
            set({expenses:response.data.totalExpenses})
            
        } catch (error) {
          set({ error: error.response.data.message });
        } finally {
          set({ isLoading: false });
        }
      }
}))