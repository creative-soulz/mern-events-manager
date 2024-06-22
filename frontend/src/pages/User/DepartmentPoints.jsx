import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchPointsForDepartmentQuery } from '../../redux/api/pointApiSlice';

const DepartmentPoints = () => {
  const { departmentName } = useParams();
  const [departmentPoints, setDepartmentPoints] = useState([]);
  const [departmentTotalPoints, setDepartmentTotalPoints] = useState(0);
  const { data, error, isLoading } = useFetchPointsForDepartmentQuery(departmentName);

  useEffect(() => {
    if (data) {
      setDepartmentPoints(data.departmentPoints);
      setDepartmentTotalPoints(data.departmentTotalPoints.total);
    }
  }, [data]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white">{departmentName} DEPARTMENT SCORES</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className="overflow-x-auto border border-[#263c57] rounded-md">
        <table className="min-w-full">
          <thead className="bg-[#263c57] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Year</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Event</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="bg-[#1f2833] text-white">
            {departmentPoints.map((point, index) => (
              <tr key={index} className="transition duration-300 ease-in-out">
                <td className="px-4 py-3 whitespace-nowrap">{point.participant.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{point.participant.year}</td>
                <td className="px-4 py-3 whitespace-nowrap">{point.participant.event.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{point.point}</td>
              </tr>
            ))}
            <tr> 
              <td className="px-4 py-3 whitespace-nowrap"></td>
              <td className="px-4 py-3 whitespace-nowrap" colSpan="2">Total Points</td>
              <td className="px-4 py-3 whitespace-nowrap">{departmentTotalPoints}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentPoints;
