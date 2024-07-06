// src/views/admin/marketplace/Marketplace.js
import React, { useEffect, useState } from "react";
import axios from "api/axios";
import Banner from "./components/Banner";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";
import ButtonCreate from "components/atom/ButtonCreate/ButtonCreate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "hook/useAuth";
import { useProducTypeApi } from "../tables/components/ProductTypeApi/useProductTypeApi";
import DropDownCate from "components/atom/DropDown/DropDown";
import Paging from "components/atom/Paging/Paging";
import Search from "components/atom/Search/Search";

const Marketplace = () => {
  const label = "product";
  const ListType = useProducTypeApi();
  const [ListProduct, setListProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(6);
  const token = useAuth();
  const headers = { Authorization: `Bearer ${token}` };

  const fetchApi = async (page = 1, searchTerm = '', sort = 'asc') => {
    try {
      const response = await axios.get(`products?page=${page}&sl=${pageSize}&search=${encodeURIComponent(searchTerm)}&sort=${sort}`);
      if (response?.data?.products) {
        setListProduct(response.data.products);
        setFilteredProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.totalProducts / pageSize));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi(currentPage, '', 'asc');
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`products/${id}`, { headers });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setListProduct((prevList) => prevList.filter((product) => product._id !== id));
        setFilteredProducts((prevList) => prevList.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    }
  };

  const handleProductTypeSelect = (productType) => {
    setSelectedProductType(productType);
    if (productType) {
      setFilteredProducts(ListProduct.filter((product) => product.productTypeID._id === productType._id));
    } else {
      setFilteredProducts(ListProduct);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchApi(page, searchTerm, sortOrder);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    fetchApi(1, searchTerm, sortOrder);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    fetchApi(currentPage, searchTerm, event.target.value);
  };

  return (
    <div className="grid h-full grid-cols-1 gap-5 mt-3 xl:grid-cols-2 2xl:grid-cols-2">
      <div className="w-full col-span-1 h-fit xl:col-span-1 2xl:col-span-2">
        <div className="flex flex-col justify-between px-4 mt-5 mb-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            All products
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <DropDownCate list={ListType} onSelect={handleProductTypeSelect} />
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-between px-1 mt-5 mb-4 md:flex-row md:items-center">
          <ButtonCreate add={label} />
          <Search onSearch={handleSearch} />
        </div>
        <div>
          <label>Sort by: </label>
          <select value={sortOrder} onChange={handleSortChange} className="ml-2 p-2 border rounded-md">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3 mt-4">
          {filteredProducts.map((list, index) => (
            <NftCard
              key={index}
              productId={list._id}
              index={index}
              name={list.name}
              materialID={list.materialID}
              gemstoneID={list.gemstoneID}
              price={list.price}
              imageLink={list.imageIDs}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Paging
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Marketplace;
