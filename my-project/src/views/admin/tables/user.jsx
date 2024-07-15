import CheckTableUser from "./components/CheckTableUser";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";
import { columnsDataUser } from "./variables/columnsData";
import { ToastContainer } from "react-toastify";
import { useUserApi } from "./components/useUserApi/useUserApi";
import { columnsDataCategory } from "./variables/columnsData";
import LoadingPage from "../marketplace/pages/LoadingPage/LoadingPage";
const Tables = () => {
  const { listType: userList, loading } = useUserApi();
 
  const name = [
    { name: "Users", data: userList },    
  ]

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols">
        {loading ? (
          <div className="pl-[500px] pt-[150px]">
          <LoadingPage/>
          </div>
        ) : (
          name.map((data, index) => (
            <CheckTableUser
              key={index}
              name={data?.name}
              columnsData={columnsDataUser}
              tableData={data?.data}
            />
          ))
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );

};

export default Tables;
