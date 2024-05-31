import { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import BackButton from "../BackButton/BackButton";
import Card from "components/card";
import { useCreateApi } from "api/CreateApi/CreateApi";

export default function Create({ label }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const create = useCreateApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    create(name, weight, size, label);
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
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
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
            <div className="-mb-3 flex items-center">
              <Typography variant="h6" color="blue-gray" className="mr-1">
                Weight
              </Typography>
              <Typography variant="h6" color="red">
                *
              </Typography>
            </div>
            <Input
              type="number"
              size="lg"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setWeight(e.target.value)}
            />
            <div className="-mb-3 flex items-center">
              <Typography variant="h6" color="blue-gray" className="mr-1">
                Size
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
              onChange={(e) => setSize(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-3 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
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
