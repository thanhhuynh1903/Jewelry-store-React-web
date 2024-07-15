import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateUserApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const create = async (
    username, password, name, role, age, label
  ) => {
    const param = {
      username, password, name, role, age, label
    };
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const endpoint =
        label === "users" ? "staffsRouter/signup" : ""
       
      if (endpoint) {
        const response = await axios.post(endpoint, param, { headers });
        if (response?.data?.success) {
          navigate("/admin/users/")
          return toast.success(`Create ${label} Successfully`);
          
        } else {
          return toast.error(response?.data?.message);
        }
      } else {
        return toast.error("Invalid label provided");
     
      }
    } catch (error) {
      toast.error(`Failed to create ${label.toLowerCase()}`);
      console.error(`Failed to create ${label.toLowerCase()}`, error);
    }
  };

  return create;
};
