import React, { useEffect, useState } from 'react';
import { useFetchPointsByDepartmentQuery } from '../../redux/api/pointApiSlice';
import { Link } from 'react-router-dom';


const Point = () => {
  const [departmentPoints, setDepartmentPoints] = useState([]);
  const { data: departmentData, isLoading, isError } = useFetchPointsByDepartmentQuery();

  useEffect(() => {
    if (departmentData) {
      const extractedData = Object.entries(departmentData).map(([departmentName, departmentPoints]) => ({ departmentName, departmentPoints }));
      setDepartmentPoints(extractedData);
    }
  }, [departmentData]);

  return (
    <>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-white">SCORE</h1>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data</div>}
        {departmentPoints.length > 0 && (
          <div className="overflow-x-auto border border-none rounded-md">
            <table className="min-w-full">
              <thead className="bg-[#263c57] text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Points</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">View Details</th>
                </tr>
              </thead>
              <tbody className="bg-[#1f2833] ">
                {departmentPoints.map((department, index) => (
                  <tr key={index} className="transition duration-300 ease-in-out">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-100">{department.departmentName}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-100">{department.departmentPoints}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-100">
                      <Link to={`/point/department/${department.departmentName}/points`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Point;
