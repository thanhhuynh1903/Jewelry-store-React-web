import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useMemo } from "react";
import Progress from "components/progress";
import ButtonCreate from "components/atom/ButtonCreate/ButtonCreate";
import ButtonAction from "components/atom/ButtonDelete/ButtonAction";
import { Link } from "react-router-dom";
import useAuth from "hook/useAuth";
import axios from "api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
const ComplexTableCustomer = (props) => {
  const { columnsData, tableData, handleDelete,refreshList  } = props;

  const { name, index } = props;
  const token = useAuth();
  
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const nameLower = name.toLowerCase();
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const handleStatusChange = async (id, currentStatus) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const url = currentStatus
        ? `https://baitapdeploy-production.up.railway.app/customers/${id}/deactivate`
        : `https://baitapdeploy-production.up.railway.app/customers/${id}/activate`;

      const response = await axios.patch(url, {}, { headers });

      if (response.data.success) {
        toast.success(response.data.message);       
        refreshList()
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Failed to fetch status", error);
      toast.error("Failed to fetch status");
    }
  };

  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </div>
        {/* <div className="center flex items-center justify-center">
          <ButtonCreate name={name} />
          
        </div> */}
      </header>

      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              const rowId = row.original._id;
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PHONE") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === "Approved" ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "Disable" ? (
                              <MdCancel className="text-red-500" />
                            ) : cell.value === "Error" ? (
                              <MdOutlineError className="text-orange-500" />
                            ) : null}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "ADDRESS") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell?.value}
                        </p>
                      );
                    } else if (cell.column.Header === "INVOICE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {" "}
                          {cell?.row?.original?.orders?.length}{" "}
                        </p>
                      );
                    } else if (cell.column.Header === "ACTIVE/DEACTIVE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {" "}
                          <label class="inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              value=""
                              class="peer sr-only"
                              checked={cell?.row?.original?.status}
                              onChange={() =>
                                handleStatusChange(rowId, cell?.row?.original?.status)
                              }
                            />
                            <div class="after:start-[2px] peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          </label>
                        </p>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTableCustomer;
