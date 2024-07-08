import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer, getAllCustomers } from '../../api/CustomerApi';
import { CircularProgress } from '@mui/material';

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        const customersData = await getAllCustomers();
        setCustomers(customersData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = customers.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(customers.length / recordsPerPage);
  const pageNumbers = [...Array(nPage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (id: number) => {
    setCurrentPage(id);
  };

  const handleRowClick = (customerId: number) => {
    navigate(`/admin/dashboard/customers/${customerId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="text-[36px] text-font_secondary font-bold">Customers</div>
      <div className="border-t border-[#C2C2C2]" />
      <div className="text-[16px] text-font_secondary font-normal py-4">List of all customers available</div>
      <table className="w-[80%] text-sm text-left text-font_secondary">
        <thead className="text-sm text-font_primary uppercase bg-secondary">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.slice(firstIndex, lastIndex).map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50" onClick={() => handleRowClick(item.id)}>
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <nav className="flex items-center justify-center m-6">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              onClick={prePage}
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-font_primary rounded-s-lg hover:text-gray-900 bg-secondary"
            >
              Previous
            </a>
          </li>
          {pageNumbers.map((n) => (
            <li key={n} className={`${currentPage === n ? 'active' : ''}`}>
              <a
                onClick={() => changeCurrentPage(n)}
                href="#"
                className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === n ? 'bg-primary text-white' : 'text-font_secondary hover:text-gray-900'}`}
              >
                {n}
              </a>
            </li>
          ))}
          <li>
            <a
              onClick={nextPage}
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-font_primary rounded-e-lg hover:text-gray-900 bg-secondary"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Customers;
