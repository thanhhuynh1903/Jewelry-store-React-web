import React, { useState } from "react";
import Card from "components/card";
import FormProductInfo from "components/atom/FormProductInfo/FormProductInfo";
import FormProductDes from "components/atom/FormProductDes/FormProductDes";
import FormComponent from "components/atom/FormComponent/FormComponent";
import BackButton from "components/atom/BackButton/BackButton";
import { Button } from "@material-tailwind/react";
import { MdFileUpload } from "react-icons/md";
import { useProductCreateApi } from "api/ProductCreate/ProductCreate";
import { FaChevronDown } from "react-icons/fa";

export default function CreateProduct({ label }) {
  const create = useProductCreateApi();
  const [formData, setFormData] = useState({
    name: "",
    images: [],
    color: "",
    weight: "",
    price: "",
    size: "",
    quantity: "",
    materialID: "",
    gemstoneID: "",
    productTypeID: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    create(form);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const button = [
    { name: "Submit" },
    { name: "Submit & Add more product" },
    { name: "Cancel" },
  ];

  return (
    <div className="flex w-full flex-col gap-5">
      <BackButton extra={`mt-2 ml-2`} />
      <form onSubmit={handleSubmit}>
        <div className="mt-3 flex w-full flex-col gap-5 lg:grid lg:grid-cols-9">
          <div className="z-0 col-span-3 h-full lg:!mb-0">
            <Card extra={"h-full p-4"}>
              <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
                <label className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                  <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                  <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                    Upload Files
                  </h4>
                  <p className="mt-2 text-sm font-medium text-gray-600">
                    PNG, JPG and GIF files are allowed
                  </p>
                  <input
                     type="file"
                     multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </Card>
          </div>
          <div className="z-0 col-span-9 lg:!mb-0">
            <FormProductInfo formData={formData} handleInputChange={handleInputChange} />
          </div>
          <div className="z-0 col-span-12 lg:!mb-0">
            <FormProductDes formData={formData} handleInputChange={handleInputChange} />
          </div>
          <div className="z-0 col-span-12 lg:!mb-0">
            <FormComponent formData={formData} handleInputChange={handleInputChange} />
          </div>
          <div className="z-0 col-span-12 lg:!mb-0">
            <Card
              extra={`p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400`}
            >
              <div className="border-slate-200/60 rounded-md rounded-[10px] border border p-5 p-5">
                <div className="border-slate-200/60 flex w-full border-b-4 p-5 text-center">
                <div className="my-auto">
            <FaChevronDown />
          </div>
                  <div className="pl-2">Product Description</div>
                </div>
                <div className="mt-5">
                  <div class="mb-5">
                    <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
                      <div className="z-0 col-span-4 lg:!mb-0">
                        <div className="flex items-center">
                          <label class="mb-1 block text-center text-sm font-medium text-gray-900 dark:text-white">
                            Description
                          </label>
                          <div className="bg-slate-200 ml-2 rounded-md border bg-gray-200 px-2 py-0.5	 text-xs text-gray-600">
                            Required
                          </div>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-gray-700">
                          Description that describe your product more detail and
                          clearly to make the user understand about your product
                        </p>
                      </div>
                      <div className="z-0 col-span-8 lg:!mb-0">
                        <div className="dark:bg-darkmode-900 dark:border-darkmode-400/20 rounded-md border bg-gray-200 p-5 dark:text-gray-700">
                          <div className="mt-5 block items-center first:mt-0 sm:flex">
                            <textarea className="h-full w-full p-2"  name="description"
                              value={formData?.description}
                              onChange={handleInputChange}></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="float-right mt-3 flex flex-wrap justify-end gap-4 text-right">
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
      </form>
    </div>
  );
}
