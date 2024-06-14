import React, { useEffect } from "react";
import useAuth from "hook/useAuth";
import axios from "api/axios";
import { toast } from "react-toastify";

export default function ButtonDelete({id}) {
  const token = useAuth();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchApi = async() =>{
      try {
        const response = await axios.delete(`producttype/${id}`,{headers});
        console.log(response?.data);
        if(response?.data?.success){
          return toast.success(response?.data?.message)
        }
      } catch (error) {
        console.error("Failed to delete selected rows", error);
        return { success: false, error };
      }
    }
    
  const handleDelete = () =>{
    fetchApi();
  }


  return (
    <button
      type="button"
      class="mb-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-1.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
