import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import axios from "api/axios";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";
import ButtonCreate from "components/atom/ButtonCreate/ButtonCreate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "hook/useAuth";
const Marketplace = () => {
  const label = "product";
  const [ListProduct, setListProduct] = useState([]);
  const token = useAuth();
  const headers = { Authorization: `Bearer ${token}` };
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`products/${id}`, { headers});

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setListProduct((prevList) => prevList.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="grid h-full grid-cols-1 gap-5 mt-3 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="w-full col-span-1 h-fit xl:col-span-1 2xl:col-span-2">
        <div className="flex flex-col justify-between px-4 mt-5 mb-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">All products</h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white" href=" ">
                Art
              </a>
            </li>
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white" href=" ">
                Music
              </a>
            </li>
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white" href=" ">
                Collection
              </a>
            </li>
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white" href=" ">
                <a href=" ">Sports</a>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-between px-1 mt-5 mb-4 md:flex-row md:items-center">
          <ButtonCreate add={label} />
        </div>
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ListProduct.map((list, index) => (
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
      </div>

      <div className="w-full h-full col-span-1 rounded-xl 2xl:col-span-1">
        <TopCreatorTable extra="mb-5" tableData={tableDataTopCreators} columnsData={tableColumnsTopCreators} />
        <HistoryCard />
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Marketplace;
