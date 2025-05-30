import { useEffect, useState } from 'react';
import useAuth from 'hook/useAuth';
import axios from 'api/axios'; // Adjust the import path if necessary
import { useRefresh } from 'context/RefreshProvider';
export const useStoreApi = () => {
  const [listType, setListType] = useState([]);
  const token = useAuth();
  const { shouldRefresh } = useRefresh();
  const fetchApi = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('stores', { headers });

     if(response?.data?.success)
        setListType(response?.data?.stores);

    } catch (error) {
      console.error('Failed to fetch material data', error);
    }
  };

  useEffect(() => {
  fetchApi();
  }, [token,shouldRefresh]);

  return listType;
};
