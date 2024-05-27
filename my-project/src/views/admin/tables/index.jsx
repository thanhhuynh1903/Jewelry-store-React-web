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
const Tables = () => {
  const GemstoneList = useGemstoneApi();
  const name = [
    { name: "Product" ,data : "dataProduct"},
    { name: "Material" ,data:"dataMaterial"},
    { name: "Gemstone", data: GemstoneList },
  ];
  
  console.log(GemstoneList);
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        {name.map((data, index) => (
          <CheckTable
            dataprops={data.data}
            name={data.name}
            index={index}
            columnsData={columnsDataGemstone}
            tableData={GemstoneList}
          />
        ))}{" "}
      </div>
      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div> */}
    </div>
  );
};

export default Tables;
