import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/FooterHomePage";
import { Link } from "react-router-dom";
import axios from "api/axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          console.error("Failed to fetch product:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) return <div>Loading...</div>; // Display loading state

  const handleCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductExist = cart.find((item) => item._id === product._id);
    if (isProductExist) {
      const updateCart = cart.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updateCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, quantity }])
      );
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
  };

  return (
    <>
      <Navbar />
      <section className="overflow-hidden text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <div className="flex flex-col justify-center w-full lg:w-1/2">
              <div className="flex">
                <img
                  alt={product.name}
                  className="mr-4 h-64 max-h-[400px] w-full rounded border border-gray-200 object-contain object-center shadow-md lg:h-auto"
                  src={product.imageIDs[0].imageLink}
                />
                <div className="flex flex-col">
                  <img
                    alt={product.name}
                    className="object-contain object-center w-full mb-4 border border-gray-200 rounded shadow-md h-fit"
                    style={{ maxHeight: "250px" }}
                    src={product.imageIDs[1].imageLink}
                  />
                  <img
                    alt={product.name}
                    className="object-contain object-center w-full border border-gray-200 rounded shadow-md h-fit"
                    style={{ maxHeight: "250px" }}
                    src={product.imageIDs[2].imageLink}
                  />
                </div>
              </div>
            </div>
            <div className="w-full mt-6 lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
                {product.name}
              </h1>
              <p className="leading-relaxed">
                Material: {product.materialID?.name}
              </p>
              <p className="leading-relaxed">
                Gemstone: {product.gemstoneID?.name}
              </p>
              <p className="leading-relaxed">
                Description: {product.description}
              </p>
              <p className="leading-relaxed">
                {product.productTypeID?.categoryID?.description}
              </p>
              <p className="leading-relaxed">
                {product.productTypeID?.description}
              </p>
              <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100"></div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-medium text-gray-900 title-font">
                  {product.price}
                </span>
                <div className="flex ml-4">
                  <div className="px-4 py-3">Quantity</div>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    className="w-16 p-2 mr-4 border border-gray-300 rounded"
                  />
                  <Link
                    to={"/cart"}
                    className="flex px-6 py-2 ml-auto border-0 rounded bg-bloom text-hemp focus:outline-none"
                    onClick={() => handleCart(product)}
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
              {showAlert && (
                <div className="mt-4 text-green-600">Added to Cart</div>
              )}
              {showError && (
                <div className="mt-4 text-red-600">Failed to add to Cart</div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductDetail;
