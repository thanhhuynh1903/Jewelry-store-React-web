import CheckTable from "./components/CheckTable";

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

import { columnsDataGemstone } from "./variables/columnsData";
import { useGemstoneApi } from "./components/GemstoneApi/useGemstoneApi";
import { useMaterialApi } from "./components/MaterialApi/useMaterialApi";
import { useProducTypeApi } from "./components/ProductTypeApi/useProductTypeApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tables = () => {
  const GemstoneList = useGemstoneApi();
  const MaterialList = useMaterialApi();
  const TypeList = useProducTypeApi();
  const name = [
    { name: "Material", data: MaterialList },
    { name: "Gemstone", data: GemstoneList },
  ];
  const nameType = [{ name: "Type", data: TypeList }];

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        {name.map((data, index) => (
          <CheckTable
            name={data.name}
            index={index}
            columnsData={columnsDataGemstone}
            tableData={data.data}
          />
        ))}{" "}
      </div>
      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns} </div>
      />*/}
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        {nameType.map((data, index) => (
          <ComplexTable
            name={data.name}
            columnsData={columnsDataComplex}
            tableData={data.data}
          />
        ))}
      </div>
      <ToastContainer position="top-right" autoClose="3000" />
    </div>
  );
};

export default Tables;
