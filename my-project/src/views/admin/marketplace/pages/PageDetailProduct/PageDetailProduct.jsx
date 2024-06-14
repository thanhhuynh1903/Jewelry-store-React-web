import React, { useEffect } from "react";
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

  console.log(productId);

  const fetchApi = async () => {
    try {
      const response = await axios.get(`/product/${productId}`, { headers });
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  });

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
            <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
              <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                  Upload Files
                </h4>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  PNG, JPG and GIF files are allowed
                </p>
              </button>
            </div>
          </Card>
        </div>
        <div className="z-0 col-span-9 lg:!mb-0">
          <FormProductInfo />
        </div>
        <div className="z-0 col-span-12 lg:!mb-0">
          <FormProductDes />
        </div>
        <div className="z-0 col-span-12 lg:!mb-0">
          <FormComponent />
        </div>

        {/* <div className="col-span-3 lg:col-span-3 lg:mb-0 3xl:col-span-3">
        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <FormInput />
        </div>
      </div> */}
      </div>
      <div className="float-right flex flex-wrap justify-end gap-4 text-right">
        {button.map((item, index) => (
          <Button
            key={index}
            className={
              item.name === "Submit"
                ? "w-auto"
                : "inline-gray-400 w-auto bg-white text-gray-400 outline "
            }
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
