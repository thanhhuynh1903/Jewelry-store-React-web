import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdateUserApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const update = async (
    username, password, name, role, age, label,updateId, 
  ) => {
    const param = {
      username, password, name, role, age, label
    };
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const endpoint =
        label === "users" ? `staffsRouter/${updateId}` : ""
       
      if (endpoint) {
        const response = await axios.put(endpoint, param, { headers });
        if (response?.data?.success) {
          toast.success(`Update ${label} Successfully`);
          navigate("/admin/users/")
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Invalid label provided");
        console.error("Invalid label provided");
      }
    } catch (error) {
      toast.error(`Failed to update ${label.toLowerCase()}`);
      console.error(`Failed to update ${label.toLowerCase()}`, error);
    }
  };

  return update;
};
