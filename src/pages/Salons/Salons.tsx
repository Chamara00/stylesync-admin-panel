import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSalons, Salon } from '../../api/salonApi';
import { CircularProgress } from '@mui/material';

const Salons: React.FC = () => {
  const navigate = useNavigate();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  useEffect(() => {
    const getSalons = async () => {
      try {
        setLoading(true);
        const salonsData = await getAllSalons();
        setSalons(salonsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getSalons();
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = salons?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(salons ? salons.length : 0 / recordsPerPage);

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

  const handleRowClick = (salonId: number) => {
    navigate(`/admin/dashboard/salons/${salonId}`);
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
      <div className="text-[36px] text-font_secondary font-bold">Salons</div>
      <div className="border-t border-[#C2C2C2]" />
      <div className="text-[16px] text-font_secondary font-normal py-4">List of all salons available</div>
      <div>
        <table className="w-[80%] text-sm text-left  text-font_secondary">
          <thead className="text-sm text-font_primary uppercase bg-secondary ">
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
                Contact no.
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.slice(firstIndex, lastIndex).map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b  hover:bg-gray-50 "
                onClick={() => handleRowClick(item.id)}
              >
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.contactNo}</td>
                <td className="px-6 py-4">{item.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default Salons;
