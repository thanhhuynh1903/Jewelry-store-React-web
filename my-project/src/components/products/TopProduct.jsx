import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "api/axios";

const TopProducts = ({ handleOrderPopup }) => {
  const [listProduct, setListProduct] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await axios.get(`products/`);
      if (response?.data?.products) {
        setListProduct(response?.data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const displayPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      trailingZeroDisplay: "stripIfInteger",
    });
  };

  const topProducts = listProduct.sort((a, b) => b.price - a.price).slice(0, 4);

  return (
    <div className="py-10 bg-gray-100">
      <div className="container mx-auto">
        <div className="mx-auto my-24 ml-10 text-left">
          <p data-aos="fade-up" className="text-2xl text-primary text-bloom">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-sm text-hemp">
            Discover the highest-rated products handpicked just for you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-20 mb-10 ml-22 place-items-center sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {topProducts.map((product) => (
            <div
              key={product.id}
              data-aos="zoom-in"
              className="hover:bg-black/80 dark:hover:bg-primary group relative mt-5 max-w-[300px] rounded-2xl bg-white shadow-xl duration-300 hover:text-white dark:bg-gray-800"
            >
              <div className="flex items-center justify-center h-screen-full w-screen-full">
                <img
                  src={
                    product.imageIDs.length > 0
                      ? product.imageIDs[0].imageLink
                      : ""
                  }
                  alt=""
                  className="block object-contain max-w-full max-h-full mx-auto duration-300 transform drop-shadow-md group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <div className="flex items-center justify-center w-full gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold group-hover:text-hemp">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 duration-300 line-clamp-2 group-hover:text-bloom">
                  {displayPrice(product.price)}
                </p>
                <button
                  className="px-4 py-1 mt-4 duration-300 rounded-full bg-primary group-hover:text-primary text-hemp hover:scale-105 group-hover:bg-bloom"
                  onClick={handleOrderPopup}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
