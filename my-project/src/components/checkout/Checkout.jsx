import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'api/axios';

function Checkout() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
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
      }, config);
      setCustomer(response.data);
      alert('Customer created successfully!');
    } catch (error) {
      console.error('Error creating customer:', error.response? error.response.data : error.message);
      alert(`Error creating customer: ${error.response? error.response.data : error.message}`);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Customer Info</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-2 text-sm font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="townCity" className="block mb-2 text-sm font-bold text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 text-sm font-bold text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Create Customer and Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;