// src/functions/useDeleteData.js
import { useCallback } from "react";
import axios from "api/axios"; // Adjust the import path if necessary
import useAuth from "hook/useAuth";
import { toast } from "react-toastify";
const useDeleteData = () => {
  const token = useAuth();

  const deleteData = useCallback(
    async (selectedRow, endpoint) => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
       const response =  
        await Promise.all(
          selectedRow.map((id) => axios.delete(`${endpoint}/${id}`, { headers }))
        );
        if(response?.data?.success){
        return toast.success(response?.data?.message);
        } 
      } catch (error) {
        console.error("Failed to delete selected rows", error);
        return { success: false, error };
      }
    },
    [token]
  );

  return deleteData;
};

export default useDeleteData;
