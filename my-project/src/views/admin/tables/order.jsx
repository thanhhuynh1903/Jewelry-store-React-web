import React, { useState, useEffect } from "react";
import ComplexTableOrder from "./components/ComplexTableOrder";
import { columnsDataOrder } from "./variables/columnsData";
import { toast, ToastContainer } from "react-toastify";
import { useOrderApi } from "./components/OrderApi/useOrderApi";
import Search from "components/atom/Search/Search";
import useAuth from "hook/useAuth";
import axios from "api/axios";
import LoadingPage from "../marketplace/pages/LoadingPage/LoadingPage";
import Paging from "components/atom/Paging/Paging";

const Tables = () => {
  const { listType: OrderList, loading, refetch } = useOrderApi();
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = useAuth();

  useEffect(() => {
    console.log("displayedOrders updated:", displayedOrders);
    setDisplayedOrders(OrderList);
  }, [OrderList,]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      handleGetAllOrders();
      return;
    }
  
    setSearchLoading(true);
    try {
      const response = await axios.get(`orders?customerName=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.success) {
        console.log("Search results:", response?.data?.orders); // Thêm dòng này
        setDisplayedOrders(response?.data?.orders);
        setCurrentPage(1); // Reset to the first page after search
        if (response?.data?.orders.length === 0) {
          toast.error("Not found");
        }
      }
    } catch (error) {
      console.error("Error searching orders:", error);
    } finally {
      setSearchLoading(false);
    }
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGetAllOrders = async () => {
    setSearchLoading(true);
    try {
      await refetch(); // Refetch the orders using the refetch function from useOrderApi
      setDisplayedOrders(OrderList); // Update the displayed orders with the refetched list
      setCurrentPage(1); // Reset to the first page after fetching all
    } catch (error) {
      console.error("Error fetching all orders:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = displayedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(displayedOrders.length / itemsPerPage);

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols">
        <div className="flex justify-between">
          <h1
            onClick={handleGetAllOrders}
            className="ml-2 text-2xl font-bold text-black cursor-pointer"
          >
            All orders
          </h1>
          <Search onSearch={handleSearch} />
        </div>
        {loading || searchLoading ? (
          <div className="pl-[500px] pt-[150px]">
            <LoadingPage />
          </div>
        ) : (
          <>
           {console.log("Current orders:", currentOrders)} {/* Thêm dòng này */}
            <ComplexTableOrder
              name="Orders"
              columnsData={columnsDataOrder}
              tableData={currentOrders}
              pageSize={itemsPerPage} // Pass the page size as a prop to ComplexTableOrder

            />
            <Paging
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Tables;
