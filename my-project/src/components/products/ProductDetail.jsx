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

  const displayPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      trailingZeroDisplay: "stripIfInteger",
    });
  };

  return (
    <>
      <Navbar />
      <section className="body-font overflow-hidden text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <div className="flex w-full flex-col justify-center lg:w-1/2">
              <div className="flex">
                <img
                  alt={product.name}
                  className="mr-4 h-64 max-h-[400px] w-full rounded border border-gray-200 object-contain object-center shadow-md lg:h-auto"
                  src={product.imageIDs[0].imageLink}
                />
                <div className="flex flex-col">
                  <img
                    alt={product.name}
                    className="mb-4 h-fit w-full rounded border border-gray-200 object-contain object-center shadow-md"
                    style={{ maxHeight: "250px" }}
                    src={product.imageIDs[1].imageLink}
                  />
                  <img
                    alt={product.name}
                    className="h-fit w-full rounded border border-gray-200 object-contain object-center shadow-md"
                    style={{ maxHeight: "250px" }}
                    src={product.imageIDs[2].imageLink}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
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
              <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5"></div>
              <div className="flex items-center justify-between">
                <span className="title-font text-2xl font-medium text-gray-900">
                  {displayPrice(product.price)}
                </span>
                <div className="ml-4 flex">
                  <div className="px-4 py-3">Quantity</div>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    className="mr-4 w-16 rounded border border-gray-300 p-2"
                  />
                  <Link
                    to={"/cart"}
                    className="ml-auto flex rounded border-0 bg-bloom px-6 py-2 text-hemp focus:outline-none"
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
