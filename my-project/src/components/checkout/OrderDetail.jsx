import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Footer from "components/footer/FooterAuthDefault";
import Navbar from "components/navbar/Navbar";

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data.order);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId, token]);

  if (!order) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="mb-4 text-2xl font-bold">Order Details</h2>
        <div className="mb-4 rounded border p-4">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
          </p>
          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>
          <h3 className="mt-4 text-xl font-bold">Products</h3>
          <ul>
            {order.orderDetails.map((detail) => (
              <li key={detail._id} className="mb-2 rounded border p-2">
                <p>
                  <strong>Name:</strong> {detail.productID.name}
                </p>
                <p>
                  <strong>Price:</strong> ${detail.productID.price.toFixed(2)}
                </p>
                <p>
                  <strong>Quantity:</strong> {detail.quantity}
                </p>
                <img
                  src={detail.productID.imageIDs[0].imageLink}
                  alt={detail.productID.name}
                  className="mt-2 h-24 w-24 rounded object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mb-4 rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Back
        </button>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetail;
