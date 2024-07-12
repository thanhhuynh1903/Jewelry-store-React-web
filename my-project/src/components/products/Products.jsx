import React, { useEffect, useState } from "react";
import axios from "api/axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [ListProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      const response = await axios.get(`products/`);
      console.log("data", response.data);
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
    <div className="mb-12 ml-20 mt-14">
      <div className="container">
        <div className="mx-auto mb-10 max-w-[600px] text-center">
          <p data-aos="fade-up" className="text-primary text-2xl text-bloom">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-hemp">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        <div>
          <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {ListProduct.map((product, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className="mb-5 transform cursor-pointer space-y-3 transition-transform duration-300 hover:scale-105"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="h-[260px] w-[260px] overflow-hidden rounded-md">
                  <img
                    src={product.imageIDs[0].imageLink}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
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
    </div>
  );
};

export default Products;
