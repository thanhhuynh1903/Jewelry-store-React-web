import React, { useState } from "react";
import ComplexTableOrder from "./components/ComplexTableOrder";
import { columnsDataOrder } from "./variables/columnsData";
import { toast, ToastContainer } from "react-toastify";
import { useOrderApi } from "./components/OrderApi/useOrderApi";
import Search from "components/atom/Search/Search";
import useAuth from "hook/useAuth";
import axios from "api/axios";
import LoadingPage from "../marketplace/pages/LoadingPage/LoadingPage";
const Tables = () => {
  const { listType: OrderList, loading } = useOrderApi();
  const token = useAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const name = [
    { name: "Orders", data: OrderList },
  ];

  const handleSearch = async (searchTerm) => {
    setSearchLoading(true);
    try {
      const response = await axios.get(`orders?customerName=${searchTerm}`, { headers });
      if (response?.data?.success) {
        setDisplayedOrders(response?.data?.orders);
        if (response?.data?.orders.length === 0) {
          toast.error("Not found");
        }
      }
    } catch (error) {
      console.error("Error searching orders:", error);
      // Optionally, you can show an error message to the user here
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols">
        <div className="flex justify-end">
          <Search onSearch={handleSearch} />
        </div>
        {loading || searchLoading ? (
          <div className="pl-[500px] pt-[150px]">
          <LoadingPage/>
          </div>
        ) : (
          name?.map((data, index) => (
            <ComplexTableOrder
              key={index}
              name={data?.name}
              columnsData={columnsDataOrder}
              tableData={displayedOrders?.length !== 0 ? displayedOrders : data?.data}
            />
          ))
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Tables;
