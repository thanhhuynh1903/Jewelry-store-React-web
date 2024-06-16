import { useEffect, useState } from 'react';
import useAuth from 'hook/useAuth';
import axios from 'api/axios'; // Adjust the import path if necessary

export const useProducTypeApi = () => {
  const [listType, setListType] = useState([]);
  const token = useAuth();

  const fetchApi = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('producttype', { headers });
     
      if(response?.data?.success)
        setListType(response?.data?.productTypes);

    } catch (error) {
      console.error('Failed to fetch material data', error);
    }
  };

  useEffect(() => {
  fetchApi();
  }, [token]);

  return listType;
};
