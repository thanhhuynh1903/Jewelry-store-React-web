import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Footer from "components/footer/FooterAuthDefault";
import Navbar from "components/navbar/Navbar";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">Orders</h2>
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {order._id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {order.customerID?.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-blue-500">
                    <Link
                      to={`/orders/${order._id}`}
                      className="hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderList;
