import React from "react";
import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";

const PieChartCard = ({ orderstatus }) => {
  const name = [
    { name: "Paid", data: orderstatus?.paid, color: "bg-brand-500" },
    { name: "Pending", data: orderstatus?.pending, color: "bg-yellow-500" },
    { name: "Cancelled", data: orderstatus?.cancelled, color: "bg-red-500" },
    { name: "Not enough", data: orderstatus?.notEnough, color: "bg-gray-500" },
  ];

  const status = [
    orderstatus?.paid === undefined ? 0 : orderstatus?.paid,
    orderstatus?.pending === undefined ? 0 : orderstatus?.pending,
    orderstatus?.cancelled === undefined ? 0 : orderstatus?.cancelled,
    orderstatus?.notEnough === undefined ? 100 : orderstatus?.notEnough,
  ];

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Orders
          </h4>
        </div>

        {/* <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div> */}
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={pieChartOptions} series={status} />
      </div>

      <div className="flex flex-row !justify-between gap-2 rounded-2xl shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        {name?.map((status, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center">
                <div className={`h-2 w-2 rounded-full ${status?.color}`} />
                <p className="ml-1 text-[10px] font-normal text-gray-600">
                  {status?.name}
                </p>
              </div>
              <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
                {status?.data}
              </p>
            </div>
            {index < name?.length - 1 && (
              <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />
            )}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default PieChartCard;
