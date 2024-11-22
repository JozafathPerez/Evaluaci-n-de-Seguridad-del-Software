import React from 'react';

const DataTable = ({ columns, data }) => {
  return (
    <table className="min-w-full">
    <thead className="sticky top-0 bg-sky-800 text-white">
        <tr>
        {columns.map((column) => (
            <th key={column.accessor} className="py-2 px-4 border-b text-left">
            {column.Header}
            </th>
        ))}
        </tr>
    </thead>
    <tbody>
        {data.map((row, rowIndex) => (
        <tr key={rowIndex} className="hover:bg-zinc-700">
            {columns.map((column) => (
            <td key={column.accessor} className="py-2 px-4 border-b text-left">
                {row[column.accessor]}
            </td>
            ))}
        </tr>
        ))}
    </tbody>
    </table>
  );
};

export default DataTable;