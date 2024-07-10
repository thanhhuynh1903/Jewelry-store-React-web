import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Order Success</h1>
      <p>Your order has been placed successfully!</p>
      <Link
        to="/home"
        className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Go Back to Home
      </Link>
    </div>
  );
}

export default Success;
