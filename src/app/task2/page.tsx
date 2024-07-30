"use client";
import React, { useState, useEffect, useRef } from "react";
import data from "../../../MOCK_DATA.json";

type User = {
  id: number;
  first_name: string;
  email: string;
  gender: string;
};

const AdminPage: React.FC = () => {
  const [currentData, setCurrentData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initialData = data.slice(0, itemsPerPage);
    setCurrentData(initialData);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const loadMore = () => {
      setIsLoading(true);
      setTimeout(() => {
        const nextPageData = data.slice(
          page * itemsPerPage,
          (page + 1) * itemsPerPage
        );
        setCurrentData((prevData) => [...prevData, ...nextPageData]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      }, 2000);
    };

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);

    return () => observer.current?.disconnect();
  }, [isLoading, page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Task-2 Infinte Scrolling
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-black">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-black">
                  {user.first_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-black">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-black">
                  {user.gender}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <div className="text-center py-4">Loading...</div>}
        <div ref={loadMoreRef} className="h-1"></div>
      </div>
    </div>
  );
};

export default AdminPage;
