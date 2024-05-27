import { useEffect, useState } from 'react';
import useAuth from 'hook/useAuth';
import axios from 'api/axios'; // Adjust the import path if necessary

export const useGemstoneApi = () => {
  const [listGem, setListGem] = useState([]);
  const token = useAuth();
  console.log(token); // Verify that the token is being retrieved correctly
  const fetchApi = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('gemstone', { headers });
      setListGem(response?.data?.gemstones);

    } catch (error) {
      console.error('Failed to fetch gemstone data', error);
    }
  };

  useEffect(() => {
  fetchApi();
  }, [token]);

  return listGem;
};
