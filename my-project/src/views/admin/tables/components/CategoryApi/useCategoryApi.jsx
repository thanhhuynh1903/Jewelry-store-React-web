import { useEffect, useState } from "react";
import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary

export const useCategoryApi = () => {
  const [Category, setCategory] = useState([]);
  const token = useAuth();

  const fetchApi = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get("category", { headers });

      if (response?.data?.success) {
        setCategory(response?.data?.categories); // Assuming 'categories' is the array you need
      }
    } catch (error) {
      console.error("Failed to fetch category data", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [token]);

  return Category;
};
