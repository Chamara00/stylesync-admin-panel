import React, { useState } from 'react';
import { CUSTOMER_DATA } from '../../const/DummyData';

const Customers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = CUSTOMER_DATA.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(CUSTOMER_DATA.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changeCurrentPage(id: number) {
    setCurrentPage(id);
  }

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="text-[36px] text-font_secondary font-bold">Customers</div>
      <div className="border-t border-[#C2C2C2]" />
      <div className="text-[16px] text-font_secondary font-normal py-4">List of all customers available</div>
      <table className="w-full text-sm text-left  text-font_secondary">
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
          {records.map((item) => (
            <tr key={item.id} className="bg-white border-b  hover:bg-gray-50 ">
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
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-font_primary rounded-s-lg hover:text-gray-900  bg-secondary "
            >
              Previous
            </a>
          </li>
          {numbers.map((n, i) => (
            <li key={i} className={`${currentPage === n ? 'active' : ''}`}>
              <a
                href="#"
                onClick={() => changeCurrentPage(n)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-font_secondary hover:text-gray-900   ${currentPage === n ? 'bg-primary' : ''}`}
              >
                {n}
              </a>
            </li>
          ))}
          <li>
            <a
              onClick={nextPage}
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-font_primary  rounded-e-lg hover:text-gray-900 bg-secondary"
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
