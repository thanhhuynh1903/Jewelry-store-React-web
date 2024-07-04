import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCarts(storedCart);
  }, []);

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(total);
  }, [carts]);

  const handleInc = (_id) => {
    const updatedCart = carts.map((item) => {
      if (item._id === _id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCarts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDec = (_id) => {
    const updatedCart = carts.map((item) => {
      if (item._id === _id) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCarts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeProduct = (_id) => {
    const updatedCart = carts.filter((item) => item._id !== _id);
    setCarts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (carts.length === 0) {
    return (
      <h1 className="flex h-[55vh] items-center justify-center text-4xl">
        Cart is Empty
      </h1>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex-wrap my-10 shadow-md">
        <div className="px-10 py-1 bg-white">
          <div className="flex justify-between pb-8 border-b">
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <h2 className="text-2xl font-semibold">{carts.length} Items</h2>
          </div>
          <div className="flex flex-wrap mt-10 mb-5">
            <h3 className="w-2/5 text-xs font-semibold text-gray-600 uppercase">
              Product Details
            </h3>
            <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
              Quantity
            </h3>
            <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
              Price
            </h3>
            <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
              Total
            </h3>
          </div>
          {carts.map((cart) => {
            return (
              <div
                className="flex items-center px-6 py-5 -mx-8 hover:bg-gray-100"
                key={cart._id}
              >
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={cart.imageID} alt={cart.name} />
                  </div>
                  <div className="flex flex-col justify-between flex-grow ml-4">
                    <span className="text-sm font-bold">{cart.name}</span>
                    <div
                      className="text-xs font-semibold text-gray-500 cursor-pointer hover:text-red-500"
                      onClick={() => removeProduct(cart._id)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg
                    className="w-3 text-gray-600 cursor-pointer fill-current"
                    viewBox="0 0 448 512"
                    onClick={() => handleDec(cart._id)}
                  >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                  <input
                    className="w-8 mx-2 text-center border"
                    type="text"
                    value={cart.quantity}
                    readOnly
                  />
                  <svg
                    className="w-3 text-gray-600 cursor-pointer fill-current"
                    onClick={() => handleInc(cart._id)}
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="w-1/5 text-sm font-semibold text-center">
                  {cart.price}
                </span>
                <span className="w-1/5 text-sm font-semibold text-center">
                  {cart.price * cart.quantity}
                </span>
              </div>
            );
          })}

          <Button className="flex mt-10 mb-5 text-sm font-semibold bg-bloom text-hemp">
            <Link to={"/home"}>Continue Shopping</Link>
          </Button>
        </div>
        <div id="summary" className="container w-2/4 px-8 py-10">
          <h1 className="pb-8 text-2xl font-semibold border-b">
            Order Summary
          </h1>
          <div className="flex flex-wrap justify-between mt-10">
            <span className="text-sm font-semibold uppercase">
              Items {carts.length}
            </span>
            <span className="text-sm font-semibold">$ {total}</span>
          </div>
          <div className="mt-8 border-t">
            <div className="flex justify-between py-6 text-sm font-semibold uppercase">
              <span>Total cost</span>
              <span>$ {total}</span>
            </div>
            <Link
              to="/checkout"
              className="w-full p-2 py-3 text-sm font-semibold uppercase text-hemp bg-bloom"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
