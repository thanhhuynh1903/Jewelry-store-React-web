import React from "react";
import Card from "components/card";
import FormProductInfo from "components/atom/FormProductInfo/FormProductInfo";
import FormProductDes from "components/atom/FormProductDes/FormProductDes";
import FormComponent from "components/atom/FormComponent/FormComponent";
import BackButton from "components/atom/BackButton/BackButton";
import { Button } from "@material-tailwind/react";
import { MdFileUpload } from "react-icons/md";
export default function CreateProduct({ label }) {
  const button = [
    {name:"Submit"},
    {name:"Submit & Add more product"},
    {name:"Cancel"}
  ]
  return (
    <div className="flex w-full flex-col gap-5">
      <BackButton extra={`mt-2 ml-2`}/>
      <div className="w-full mt-3 flex w-full flex-col gap-5 lg:grid lg:grid-cols-9">
        <div className="z-0 col-span-3 lg:!mb-0 h-full">
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
      <div className="flex flex-wrap justify-end gap-4 text-right float-right">
        {button.map((item, index) => (
          <Button key={index} className={(item.name === "Submit" ? "w-auto" : "w-auto outline inline-gray-400 bg-white text-gray-400 ")  }>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
