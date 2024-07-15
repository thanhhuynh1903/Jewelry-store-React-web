import useAuth from "hook/useAuth";
import axios from "api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRefresh } from "context/RefreshProvider";

const useStatisticApi = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { shouldRefresh } = useRefresh();
  const [data, setData] = useState([]);

  const fetchStatistic = async (date, month, year, storeID) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await axios.get(
        date === "" && month === "" && year === ""
          ? `orders/daily-profit?storeID=${storeID}`
          : `orders/daily-profit?date=${date}&month=${month}&year=${year}&storeID=${storeID}`,
        { headers }
      );

      if (response?.data?.success) {
        toast.success("Get statistic of store successfully");
        setData(response?.data);
      } else {
        toast.error(response?.data?.message || "Failed to get statistic of store");
      }
    } catch (error) {
      toast.error("Failed to fetch statistic");
      console.error("Failed to fetch statistic", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStatistic();
    }
  }, [token, shouldRefresh]);

  return { data, fetchStatistic };
};

export default useStatisticApi;
