import React from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import { useState } from "react";
import LineChart from "components/charts/LineChart";

const TotalSpentYear = ({dataYearDiff,dataYearPer}) => {
  const [inputNumber, setInputNumber] = useState(dataYearDiff);
  
  const convertToKFormat = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(0) + 'k';
    }
    return num?.toString();
  };

  const dataGraph = [
    {
      name: "Revenue",
      data: [0, parseInt(dataYearDiff), 0, 0, 0, 0],
      color: "#4318FF",
    },
  ]
  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">This Year</span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] flex text-md font-bold text-navy-700 dark:text-white">
            {convertToKFormat(inputNumber)} VNĐ
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Total Spent</p>
            <div className="flex flex-row items-center justify-center">
              <MdArrowDropUp className="font-medium text-green-500" />
              <p className="text-sm font-bold text-green-500"> +{dataYearPer}% </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <LineChart
            options={lineChartOptionsTotalSpent}
            series={dataGraph}
          />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpentYear;
