import React from "react";
import Card from "components/card";
import { FaChevronDown } from "react-icons/fa";
import { SelectDefault } from "../SelectOptions/SelectDefault";
export default function FormProductInfo() {
  return (
    <Card
      extra={`p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400`}
    >
      <div className="border-slate-200/60 rounded-md rounded-[10px] border border p-5 p-5">
        <div className="border-slate-200/60 flex w-full border-b-4 p-5 text-center">
          <div className="my-auto">
            <FaChevronDown />
          </div>
          <div className="pl-2">Product Information</div>
        </div>
        <div className="mt-5">
          <div class="mb-5">
            <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
              <div className="z-0 col-span-4 lg:!mb-0">
                <div className="flex items-center">
                <label class="mb-1 block text-sm font-medium text-gray-900 dark:text-white text-center">
                  Product name
                </label>
                <div className="ml-2 px-2 py-0.5 border bg-slate-200 text-gray-600 bg-gray-200	 text-xs rounded-md">Required</div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-gray-700">
                  Include min. 40 characters to make it more attractive and easy
                  for buyers to find, consisting of product type, brand, and
                  information such as color, material, or type.
                </p>
              </div>
              <div className="z-0 col-span-8 lg:!mb-0">
                <input
                  type="text"
                  class="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Ex : abcxyz"
                  required
                />
              </div>
            </div>
          </div>
          <div class="mb-5">
            <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
              <div className="z-0 col-span-4 lg:!mb-0">
              <div className="flex items-center">
                <label class="mb-1 block text-sm font-medium text-gray-900 dark:text-white text-center">
                  Category
                </label>
                <div className="ml-2 px-2 py-0.5 border bg-slate-200 text-gray-600 bg-gray-200	 text-xs rounded-md">Required</div>
                </div>
               
              </div>
              <div className="col-span-8 lg:!mb-0">
                <SelectDefault/>
              </div>
            </div>
          </div>
          <div class="mt-7">
            <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
              <div className="z-0 col-span-4 lg:!mb-0">
              <div className="flex items-center">
                <label class="block text-sm font-medium text-gray-900 dark:text-white text-center">
                  Produc type
                </label>
                <div className="ml-2 px-2 py-0.5 border bg-slate-200 text-gray-600 bg-gray-200	 text-xs rounded-md">Required</div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-gray-700">
                You can add a new subcategory or choose from the existing subcategory list.
                </p>
              </div>
              <div className="col-span-8 lg:!mb-0">
                <SelectDefault/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
