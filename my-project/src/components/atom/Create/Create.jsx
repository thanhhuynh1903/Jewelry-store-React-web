import { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import BackButton from "../BackButton/BackButton";
import Card from "components/card";
import { useCreateApi } from "api/CreateApi/CreateApi";
import { ToastContainer } from "react-toastify";
import MutipleChoices from "../MutipleChoices/MutipleChoices";

export default function Create({ label }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const create = useCreateApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    create(name, weight, size, label, description);
  };

  return (
    <>
      <Card className="mx-auto mt-8 w-fit rounded-3xl bg-white py-5 px-5 shadow-md">
        <div color="transparent">
          <div className="flex justify-between">
            <Typography variant="h4" color="blue-gray" className="w-fit">
              {label}
            </Typography>
            <BackButton />
          </div>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <div className="-mb-3 flex items-center">
                <Typography variant="h6" color="blue-gray" className="mr-1">
                  Name
                </Typography>
                <Typography variant="h6" color="red">
                  *
                </Typography>
              </div>
              <Input
                size="lg"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setName(e.target.value)}
              />
              {label !== "Category" ? (
                <>
                  <div className="-mb-3 flex items-center">
                    <Typography variant="h6" color="blue-gray" className="mr-1">
                      {label === "Type" ? "Category" : "Weight"}
                    </Typography>
                    <Typography variant="h6" color="red">
                      *
                    </Typography>
                  </div>
                  <Input
                    type={label === "Type" ? "text" : "number"}
                    size="lg"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </>
              ) : (<>
                <div className="-mb-3 flex items-center">
                    <Typography variant="h6" color="blue-gray" className="mr-1">
                      {label === "Type" ? "Category" : "Weight"}
                    </Typography>
                    <Typography variant="h6" color="red">
                      *
                    </Typography>
                  </div>
                  <MutipleChoices/>
                  </>
              )}
              <div className="-mb-3 flex items-center">
                <Typography variant="h6" color="blue-gray" className="mr-1">
                  {label === "Type" || label === "Category"
                    ? "Description"
                    : "Size"}
                </Typography>
                <Typography variant="h6" color="red">
                  *
                </Typography>
              </div>
              {label === "Category" || label === "Type" ? (
                <div className="relative mb-3 h-[200px] rounded-md border-2 border-gray-900">
                  <textarea
                    className="bg-transparent peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary peer block min-h-full w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-white [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Enter description..."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <Input
                    size="lg"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </>
              )}
              <button
                type="submit"
                className="z-50 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-3 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}
