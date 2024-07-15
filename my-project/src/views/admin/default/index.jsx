import React, { useState, useEffect } from "react";
import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
// import CheckTable from "views/admin/default/components/CheckTable";
import CheckTable from "../tables/components/CheckTableStore";
import ComplexTable from "views/admin/default/components/ComplexTable";
import { columnsDataStore } from "./variables/columnsData";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import useStatisticApi from "api/StatisticApi/StatisticApi";
import { ToastContainer } from "react-toastify";
import { useStoreApi } from "../tables/components/StoreApi/useStoreApi";
const Dashboard = () => {
  const { data, fetchStatistic } = useStatisticApi();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedStoreId, setSelectedStoreId] = useState(null); // Add state for selected store ID

  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear().toString();
  const store = useStoreApi();
console.log(typeof(data));
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      await fetchStatistic(
        day,
        month,
        year,
        selectedStoreId === null ? store[0]?._id : selectedStoreId
      );
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, [date, store, selectedStoreId]);

  const handleSelectStore = (storeId) => {
    setSelectedStoreId(storeId);
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }

  const selectedStore = store.find((s) => s._id === selectedStoreId);
  console.log(data);

  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6">
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Name Store"}
          subtitle={
            selectedStore === undefined && selectedStoreId === null
              ? store[0]?.name
              : selectedStore.name
          }
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Profit"}
          subtitle={data?.totalProfit}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={data?.monthlyProfitDifference + " VNĐ"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Quantity"}
          subtitle={data?.totalQuantity}
        />
        {/* <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        /> */}
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            label={"responsive"}
            columnsData={columnsDataStore}
            tableData={store}
            onSelectStore={handleSelectStore} // Pass handleSelectStore to CheckTable
          />
        </div>

        {/* Traffic chart & Pie Chart */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <PieChartCard orderstatus={data}/>
          {/* <PieChartCard /> */}
        </div>

        {/* Complex Table , Task & Calendar */}
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          {/* <TaskCard /> */}
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar value={date} onChange={setDate} />
          </div>
          <DailyTraffic
            customer={data?.totalCustomers}
            newcustomer={data?.newCustomers}
          />
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Dashboard;
