<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'api/axios';
import useAuth from 'hook/useAuth';

function Checkout() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank');
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('accessToken');
    console.log('Retrieved token from localStorage:', savedToken);
    return savedToken;
  });
=======
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "api/axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Checkout() {
  const [carts, setCarts] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
>>>>>>> 4f4a302414e3b72f09e08fa4dd8c714042bc985a

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCarts(storedCart);
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data.customers)) {
          setCustomers(response.data.customers);
        } else {
          console.error("Unexpected response data format:", response.data);
          setCustomers([]);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        setCustomers([]);
      }
    };

    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get("/payments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPaymentMethods(response.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    const fetchStores = async () => {
      try {
        const response = await axios.get("/stores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(response.data.stores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchCustomers();
    fetchPaymentMethods();
    fetchStores();
  }, [token]);

  const handleSelectCustomer = (customer) => {
    formik.setValues({
      name: customer.name,
      age: customer.age,
      address: customer.address,
      phone: customer.phone,
    });
    formik.setFieldValue("_id", customer._id);
    setIsModalOpen(false);
  };

  const checkExistingCustomer = async (phone) => {
    try {
<<<<<<< HEAD
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('/customers', {
        name,
        age,
        phone,
        address,
        paymentMethod,
      }, config);
      setCustomer(response.data);
      alert('Customer created successfully!');
=======
      const response = await axios.get(`/customers?phone=${phone}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.customers.length > 0
        ? response.data.customers[0]
        : null;
>>>>>>> 4f4a302414e3b72f09e08fa4dd8c714042bc985a
    } catch (error) {
      console.error("Error checking customer:", error);
      return null;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      address: "",
      phone: "",
      _id: "",
      paymentMethod: {},
      store: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      age: Yup.number().required("Required").min(0, "Age must be positive"),
      address: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      store: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        let customer = await checkExistingCustomer(values.phone);
        if (!customer) {
          const customerResponse = await axios.post(
            "/customers",
            values,
            config
          );
          customer = customerResponse.data.customer;
        }

        const orderResponse = await axios.post(
          "/orders",
          {
            customerID: customer._id,
            payments: [values.paymentMethod],
            storeID: values.store,
          },
          config
        );

        const orderID = orderResponse.data.order._id;

        await axios.post(
          "/orderDetails",
          {
            products: carts.map((cart) => ({
              productID: cart._id,
              quantity: cart.quantity,
            })),
            orderID: orderID,
          },
          config
        );

        alert("Order created successfully!");
        navigate("/success");
      } catch (error) {
        console.error(
          "Error creating order:",
          error.response ? error.response.data : error.message
        );
        alert(
          `Error creating order: ${
            error.response ? error.response.data : error.message
          }`
        );
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Customer Info</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="focus:shadow-outline mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Chọn khách hàng hiện có
          </button>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-sm text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="age"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                {...formik.getFieldProps("age")}
              />
              {formik.touched.age && formik.errors.age ? (
                <div className="text-sm text-red-500">{formik.errors.age}</div>
              ) : null}
            </div>
            <div className="mb-4">
<<<<<<< HEAD
              <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-700">
=======
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
>>>>>>> 4f4a302414e3b72f09e08fa4dd8c714042bc985a
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-sm text-red-500">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                {...formik.getFieldProps("address")}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-sm text-red-500">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="paymentMethod"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Payment Method
              </label>
              <select
                id="paymentMethod"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                value={formik.values.paymentMethod || ""}
                onChange={(e) => {
                  const selectedMethod = paymentMethods.find(
                    (method) => method._id === e.target.value
                  );
                  formik.setFieldValue("paymentMethod", selectedMethod);
                }}
              >
                <option value="">Select a payment method</option>
                {paymentMethods.map((method) => (
                  <option key={method._id} value={method._id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="store"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Store
              </label>
              <select
                id="store"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                {...formik.getFieldProps("store")}
              >
                <option value="">Select a store</option>
                {stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
              </select>
              {formik.touched.store && formik.errors.store ? (
                <div className="text-sm text-red-500">
                  {formik.errors.store}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block mb-2 text-sm font-bold text-gray-700">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
                <option value="Cash">Credit Card</option>
              </select>
            </div>
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Đặt hàng
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Cart</h2>
          {carts.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {carts.map((cart) => (
                <li key={cart._id} className="mb-2 flex items-center">
                  <img
                    src={cart.imageUrl}
                    alt={cart.name}
                    className="mr-2 h-16 w-16 object-cover"
                  />
                  <div>
                    <p className="font-bold">{cart.name}</p>
                    <p>Quantity: {cart.quantity}</p>
                    <p>Price: ${cart.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-full max-w-3xl rounded bg-white p-6 shadow-lg">
            <div className="mb-4 flex justify-between">
              <h2 className="text-2xl font-bold">Select Customer</h2>
              <button
                className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
            <input
              type="text"
              placeholder="Search by name or phone"
              className="focus:shadow-outline mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul className="max-h-64 overflow-y-auto">
              {customers
                .filter(
                  (customer) =>
                    customer.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    customer.phone.includes(searchQuery)
                )
                .map((customer) => (
                  <li
                    key={customer._id}
                    className="mb-2 cursor-pointer rounded border p-2 hover:bg-gray-200"
                    onClick={() => handleSelectCustomer(customer)}
                  >
                    <p className="font-bold">{customer.name}</p>
                    <p>Phone: {customer.phone}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
