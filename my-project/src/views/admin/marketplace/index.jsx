import Banner from "./components/Banner";
// import NFt2 from "assets/img/nfts/Nft2.png";
// import NFt4 from "assets/img/nfts/Nft4.png";
// import NFt3 from "assets/img/nfts/Nft3.png";
// import NFt5 from "assets/img/nfts/Nft5.png";
// import NFt6 from "assets/img/nfts/Nft6.png";
// import avatar1 from "assets/img/avatars/avatar1.png";
// import avatar2 from "assets/img/avatars/avatar2.png";
// import avatar3 from "assets/img/avatars/avatar3.png";
import { useEffect, useState } from "react";
import axios from "api/axios";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";
import ButtonCreate from "components/atom/ButtonCreate/ButtonCreate";
import { ToastContainer } from "react-toastify";
const Marketplace = () => {
  const label = "product";
  const [ListProduct, setListProduct] = useState([]);
  const fetchApi = async () => {
    try {
      const response = await axios.get(`products/`);
      if (response?.data?.products) {
        
        return setListProduct(response?.data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="grid h-full grid-cols-1 gap-5 mt-3 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="w-full col-span-1 h-fit xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        {/* <Banner /> */}

        {/* NFt Header */}
        <div className="flex flex-col justify-between px-4 mt-5 mb-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            All products
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Art
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Music
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Collection
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                <a href=" ">Sports</a>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-between px-1 mt-5 mb-4 md:flex-row md:items-center">
          <ButtonCreate add={label}/>
          </div>
        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ListProduct.map((list, index) => (
            <NftCard
              productId={list?._id}
              index={index}
              name={list?.name}
              materialID={list?.materialID}
              gemstoneID={list?.gemstoneID}
              price={list?.price}
              imageLink={list?.imageIDs}
            />
          ))}
        </div>

        {/* Recenlty Added setion */}
        {/* <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Recently Added
          </h4>
        </div> */}

        {/* Recently Add NFTs */}
        {/* <div className="grid grid-cols-1 gap-5 mt-5 mb-5 md:grid-cols-3">
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price="0.91"
            image={NFt4}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price="0.7"
            image={NFt5}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price="2.91"
            image={NFt6}
          />
        </div> */}
      </div>

      {/* right side section */}

      <div className="w-full h-full col-span-1 rounded-xl 2xl:col-span-1">
        <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
        <HistoryCard />
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Marketplace;
