import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const LoanApplicantsTable = ({ active, containerWidth , tableData }) => {
  const [data, setData] = useState(tableData);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useMemo(
    () => [
      { header: "Applicant Name", accessorKey: "applicantName" },
      { header: "Father's Name", accessorKey: "fathersName" },
      { header: "Mother's Name", accessorKey: "mothersName" },
      {
        header: "Salary",
        accessorKey: "salary",
        cell: (info) => `₹${(info.getValue() / 100).toFixed(2)}`,
      },
      { header: "Date of Birth", accessorKey: "dob" },
      { header: "Dependents", accessorKey: "dependents" },
      { header: "PAN", accessorKey: "pan" },
      { header: "House Status", accessorKey: "houseStatus" },
      { header: "Employment Type", accessorKey: "employmentType" },
      { header: "Income", accessorKey: "income" },
      { header: "Education", accessorKey: "education" },
      { header: "Reference 1 Name", accessorKey: "ref1Name" },
      { header: "Reference 1 Contact", accessorKey: "ref1Contact" },
      { header: "Reference 2 Name", accessorKey: "ref2Name" },
      { header: "Reference 2 Contact", accessorKey: "ref2Contact" },
      { header: "Ongoing Loans", accessorKey: "ongoingLoans" },
      { header: "Loan Obligation", accessorKey: "loanObligation" },
      { header: "Permanent Address", accessorKey: "permanentAddress" },
      { header: "Current Address", accessorKey: "currentAddress" },
      { header: "Work Experience", accessorKey: "workExperience" },
      { header: "Current Address Since", accessorKey: "currentAddressSince" },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  const [width, setWidth] = useState("80vw");
  const initialRender = useRef(false);

  const getWidth = () => {
    if (!active) {
      if (typeof window !== "undefined" && window.innerWidth < 760) {
        return "87vw";
      }
      return "83vw";
    }
    return "91vw";
  };

  useEffect(() => {
    if(!initialRender.current) {
      setTimeout(() => {
        setWidth(getWidth());
        initialRender.current = true;
      },500)
    } else {
      setWidth(getWidth())
    }
 
  }, [active]);


  return (
    <div
      style={{
        width: width,
        borderRadius: "16px",
        overflowX: "scroll",
      }}
      className="table-responsive"
    >
      <table className="table style-two" >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LoanApplicantsTable;
