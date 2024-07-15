import { useEffect, useState } from 'react';
import useAuth from 'hook/useAuth';
import axios from 'api/axios'; // Adjust the import path if necessary
import { useRefresh } from 'context/RefreshProvider';
export const useOrderApi = () => {
  const [listType, setListType] = useState([]);
  const token = useAuth();
  const [loading, setLoading] = useState(true);
  const { shouldRefresh } = useRefresh();
  const fetchOrders = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('orders', { headers });

        setListType(response?.data?.orders);

    } catch (error) {
      console.error('Failed to fetch material data', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token,shouldRefresh]);

  return {listType,loading, refetch: fetchOrders};
};
