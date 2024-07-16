import React, { useEffect, useState } from "react";
import axios from "api/axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [ListProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

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

  const handleProductClick = (_id) => {
    navigate(`/product/${_id}`);
  };

  const displayPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      trailingZeroDisplay: "stripIfInteger",
    });
  };

  return (
    <div className="bg-gray-100 py-14">
      <div className="container mx-auto">
        <div className="mx-auto mb-10 max-w-[600px] text-center">
          <p className="text-2xl text-primary text-bloom">
            Top Selling Products for you
          </p>
          <h1 className="text-3xl font-bold">
            Products
          </h1>
          <p className="text-sm text-hemp">
            Discover our top selling products that customers love.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {ListProduct.map((product, index) => (
            <div
              key={product._id}
              className="p-4 transition-transform duration-300 transform bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="h-[200px] w-full overflow-hidden rounded-md">
                <img
                  src={product.imageIDs[0].imageLink}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-bloom">{product.name}</h3>
                <p className="text-sm text-hemp">
                  Price: {displayPrice(product.price)}
                </p>
                <p className="text-sm text-hemp">Color: {product.color}</p>
                <p className="text-sm text-hemp">
                  Material: {product.materialID?.name}
                </p>
                <p className="text-sm text-hemp">
                  Gemstone: {product.gemstoneID?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;