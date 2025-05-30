import { useEffect, useState } from 'react';
import useAuth from 'hook/useAuth';
import axios from 'api/axios'; // Adjust the import path if necessary
import { useRefresh } from 'context/RefreshProvider';
export const useProccessFeeApi = () => {
  const [listType, setListType] = useState([]);
  const token = useAuth();
  const [loading, setLoading] = useState(true);
  const {shouldRefresh} = useRefresh();
  const fetchApi = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('processingFee', { headers });
     if(response.data.success)
        setListType(response?.data?.fees);

    } catch (error) {
      console.error('Failed to fetch material data', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchApi();
  }, [token,shouldRefresh]);

  return {listType,loading};
};
