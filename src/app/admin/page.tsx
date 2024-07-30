'use client'
import React, { useState } from 'react';
import data from "../../../MOCK_DATA.json"

type User = {
  id: number;
  first_name: string;
  email: string;
  gender: string;
};

const AdminPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const tableData: User[] = data;
  const totalPages = Math.ceil(tableData.length / itemsPerPage); //Calculates the total number of pages by dividing the total data length by itemsPerPage and rounding up.

  //Function used for pagination --> For my understanding.
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Task-1 Tabular Pagination</h1>
      <div className="overflow-x-auto h-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="0.0px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-black">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-black">{user.first_name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-black">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-black">{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
