import React, { useEffect, useState } from "react";
import Card from "components/card";
import FormProductInfo from "components/atom/FormProductInfo/FormProductInfo";
import FormProductDes from "components/atom/FormProductDes/FormProductDes";
import FormComponent from "components/atom/FormComponent/FormComponent";
import BackButton from "components/atom/BackButton/BackButton";
import { Button } from "@material-tailwind/react";
import { MdFileUpload } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "api/axios";
import useAuth from "hook/useAuth";

export default function PageDetailProduct({ label }) {
  const token = useAuth();
  const headers = { Authorization: `Bearer ${token}` };
  const { productId } = useParams();
  const [List, setList] = useState();
  const [hover, setHover] = useState(false);

  const fetchApi = async () => {
    try {
      const response = await axios.get(`products/${productId}`, { headers });
      if (response?.data?.success) {
        setList(response?.data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const button = [
    { name: "Submit" },
    { name: "Submit & Add more product" },
    { name: "Cancel" },
  ];

  return (
    <div className="flex w-full flex-col gap-5">
      <BackButton extra={`mt-2 ml-2`} />
      <div className="mt-3 flex w-full w-full flex-col gap-5 lg:grid lg:grid-cols-9">
        <div className="z-0 col-span-3 h-full lg:!mb-0">
          <Card extra={"h-full p-4"}>
            <div
              className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6 relative"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <button className="flex h-full w-full flex-col items-center rounded-xl border-[2px] border-dashed border-gray-200 dark:!border-navy-700 lg:pb-0 relative">
                <img
                  src={List?.imageIDs[0]?.imageLink}
                  className="mb-3 h-[305.438px] w-[321.513px] rounded-xl 3xl:h-full 3xl:w-full"
                  alt=""
                />
                <div className="flex gap-4">
                  {List?.imageIDs.length > 2 ? (
                    List?.imageIDs?.slice(1)?.map((image, index) => (
                      <img
                        key={index}
                        src={image?.imageLink}
                        className="mb-3 h-[110.175px] w-full rounded-xl 3xl:h-full 3xl:w-full"
                        alt=""
                      />
                    ))
                  ) : (
                    <>
                      <div className="flex h-[90px] w-[90px] flex-col items-center rounded-xl border-[2px] border-dashed border-gray-200 bg-white dark:!border-navy-700 lg:pb-0 py-[100px] px-[65px]"></div>
                      <div className="flex h-full w-full flex-col items-center rounded-xl border-[2px] border-dashed border-gray-200 bg-white dark:!border-navy-700 lg:pb-0 py-[100px] px-[65px]"></div>
                    </>
                  )}
                </div>
                {hover && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 bg-opacity-50 rounded-xl">
                    <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                    <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                      Upload Files
                    </h4>
                    <p className="mt-2 text-sm font-medium text-gray-600">
                      PNG, JPG and GIF files are allowed
                    </p>
                  </div>
                )}
              </button>
            </div>
          </Card>
        </div>
        <div className="z-0 col-span-9 lg:!mb-0">
          <FormProductInfo data={List} />
        </div>
        <div className="z-0 col-span-12 lg:!mb-0">
          <FormProductDes data={List} />
        </div>
        <div className="z-0 col-span-12 lg:!mb-0">
          <FormComponent data={List} label={label} />
        </div>
      </div>
    </div>
  );
}
