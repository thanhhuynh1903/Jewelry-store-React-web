import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const useUpdateApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const update = async (name, weight, size, updateId ,label) => {
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
        const response = await axios.put(`${endpoint}/${updateId}`, param, { headers });
        if (response.data.success) {
          toast.success(`Update ${label} Successfully`);
          navigate("/admin/data-tables/");
        }
      } else {
        // toast.error(Response.data.message);
        console.error("Invalid label provided");
      }
    } catch (error) {
      toast.error(`Failed to create ${label.toLowerCase()}`);
      console.error(`Failed to create ${label.toLowerCase()}`, error);
    }
  };

  return update;
};
