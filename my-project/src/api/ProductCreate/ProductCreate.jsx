import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useProductCreateApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const create = async (
    name,
    image,
    size,
    weight,
    description,
    price,
    color,
    materialID,
    gemstoneID,
    productTypeID,
    quantity,
    label
  ) => {
    
    const param = {
      name,
      image,
      size,
      weight,
      description,
      price,
      color,
      materialID,
      gemstoneID,
      productTypeID,
      quantity,
    };
    console.log(param);
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const endpoint = "products";
      if (endpoint) {
        const response = await axios.post(endpoint, param, { headers });
        if (response?.data?.success) {
          toast.success(`Create ${label} Successfully`);
          navigate("/admin/data-tables/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Invalid label provided");
        console.error("Invalid label provided");
      }
    } catch (error) {
      toast.error(`Failed to create ${label.toLowerCase()}`);
      console.error(`Failed to create ${label.toLowerCase()}`, error);
    }
  };

  return create;
};
