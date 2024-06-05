import { useState, useEffect } from "react";
import { Input, Typography } from "@material-tailwind/react";
import BackButton from "../BackButton/BackButton";
import Card from "components/card";
import { useUpdateApi } from "api/UpdateApi/UpdateApi";
import { useParams } from "react-router-dom";
import axios from "api/axios";
import useAuth from "hook/useAuth";
import { ToastContainer } from "react-toastify";

export default function Update({ label }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const update = useUpdateApi();
  const { updateId } = useParams();
  const token = useAuth();
  const [itemDetail, setItemDetail] = useState({});

  const fetchApiId = async () => {
    const endpoint = label.toLowerCase();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(`${endpoint}/${updateId}`, { headers });
      if (response.data.success) {
        const detail = response?.data?.[label.toLowerCase()];
        setItemDetail(detail);
        setName(detail.name || "");
        setWeight(detail.weight || "");
        setSize(detail.size || "");
      }
    } catch (error) {
      console.error(`Failed to fetch ${label} details`, error);
    }
  };

  useEffect(() => {
    fetchApiId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    update(name, weight, size, updateId, label);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="-mb-3 flex items-center">
                <Typography variant="h6" color="blue-gray" className="mr-1">
                  {label === "Type" ? "Category" : "Weight"}
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
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <div className="-mb-3 flex items-center">
                <Typography variant="h6" color="blue-gray" className="mr-1">
                  {label === "Type" ? "Description" : "Size"}
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
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
              <button
                type="submit"
                className="z-50 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-3 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Card>
      
    </>
  );
}
