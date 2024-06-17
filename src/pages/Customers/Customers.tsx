import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { getAllCustomers } from '../../redux/features/admin/customer/customerSlice';

const Customers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customerState = useSelector((state: RootState) => state.admin.customers);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = customerState.customers.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(customerState.customers.length / recordsPerPage);
  const pageNumbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

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

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="text-[36px] text-font_secondary font-bold">Customers</div>
      <div className="border-t border-[#C2C2C2]" />
      <div className="text-[16px] text-font_secondary font-normal py-4">List of all customers available</div>
      <table className="w-full text-sm text-left text-font_secondary">
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
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.slice(firstIndex, lastIndex).map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">{item.gender}</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="text-xs font-small text-secondary hover:underline">
                  Show
                </a>
              </td>
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
