import React, { useState, useMemo, useEffect } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel, 
  flexRender 
} from '@tanstack/react-table';
import { LOAN_APPLICANTS_API } from '../../../../constants/apiConstants';

const LoanApplicantsTable = ({ active }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(LOAN_APPLICANTS_API);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(() => [
    { header: 'Applicant Name', accessorKey: 'applicantName' },
    { header: "Father's Name", accessorKey: 'fathersName' },
    { header: "Mother's Name", accessorKey: 'mothersName' },
    { 
      header: 'Salary', 
      accessorKey: 'salary',
      cell: (info) => `₹${(info.getValue() / 100).toFixed(2)}` 
    },
    { header: 'Date of Birth', accessorKey: 'dob' },
    { header: 'Dependents', accessorKey: 'dependents' },
    { header: 'PAN', accessorKey: 'pan' },
    { header: 'House Status', accessorKey: 'houseStatus' },
    { header: 'Employment Type', accessorKey: 'employmentType' },
    { header: 'Income', accessorKey: 'income' },
    { header: 'Education', accessorKey: 'education' },
    { header: 'Reference 1 Name', accessorKey: 'ref1Name' },
    { header: 'Reference 1 Contact', accessorKey: 'ref1Contact' },
    { header: 'Reference 2 Name', accessorKey: 'ref2Name' },
    { header: 'Reference 2 Contact', accessorKey: 'ref2Contact' },
    { header: 'Ongoing Loans', accessorKey: 'ongoingLoans' },
    { header: 'Loan Obligation', accessorKey: 'loanObligation' },
    { header: 'Permanent Address', accessorKey: 'permanentAddress' },
    { header: 'Current Address', accessorKey: 'currentAddress' },
    { header: 'Work Experience', accessorKey: 'workExperience' },
    { header: 'Current Address Since', accessorKey: 'currentAddressSince' },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div style={{
      width: !active? '80vw': '91vw',
      borderRadius: '16px',
      overflowX: 'scroll'
    }} className="table-responsive">
      <table className="table style-two">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
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
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
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
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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