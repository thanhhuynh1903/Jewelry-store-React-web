import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const useCreateApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const create = async (name, weight, size, label,description) => {
    const param = { name, weight, size,description };
 
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const endpoint =
        label === "Material"
          ? "material"
          : label === "Gemstone"
          ?  "gemstone"
          : label === "Category"
          ?  "category" : "";
      if (endpoint) {
        const response = await axios.post(endpoint, param, { headers });
        if (response.data.success) {
          toast.success(`Create ${label} Successfully`);
          navigate("/admin/data-tables/");
        } else {
          toast.error(response.data.message);
          navigate("/admin/data-tables/");
          console.error("Invalid label provided");

        }
      }
    } catch (error) {
      toast.error(`Failed to create ${label.toLowerCase()}`);
      console.error(`Failed to create ${label.toLowerCase()}`, error);
    }
  };

  return create;
};
