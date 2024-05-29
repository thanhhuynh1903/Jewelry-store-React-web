import { useEffect } from "react";
import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";

export const useCreateApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const create = async (name, weight, size, label) => {
    const param = { name, weight, size };
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const endpoint =
        label === "Material"
          ? "material"
          : label === "Gemstone"
          ? "gemstone"
          : "";
      if (endpoint) {
        const response = await axios.post(endpoint, param, { headers });
        if (response.data.success) {
          navigate("/admin/data-tables/");
        }
      } else {
        console.error("Invalid label provided");
      }
    } catch (error) {
      console.error(`Failed to create ${label.toLowerCase()}`, error);
    }
  };

  return create;
};
