import React, { useState, useEffect } from 'react';
import { useFetchPointsByDepartmentQuery } from '../../redux/api/pointApiSlice';
import { Link } from 'react-router-dom';

function HighScore() {
  const { data: departmentPoints, error, isLoading } = useFetchPointsByDepartmentQuery();

  const [topDepartments, setTopDepartments] = useState([]);

  useEffect(() => {
    if (!isLoading && !error && departmentPoints) {
      // Convert departmentPoints object into an array of objects
      const departmentsArray = Object.keys(departmentPoints).map(departmentName => ({
        name: departmentName,
        points: departmentPoints[departmentName]
      }));

      // Sort departments by points in descending order
      departmentsArray.sort((a, b) => b.points - a.points);

      // Take top three departments
      const topThree = departmentsArray.slice(0, 3);

      setTopDepartments(topThree);
    }
  }, [isLoading, error, departmentPoints]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">TOP SCORES</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {topDepartments.map((department, index) => (
          <div key={index} className="grad   border border-gray-600  p-4 rounded rounded-br-[80px]">
            <h3 className="md:text-5xl text-2xl font-bold text-yellow-700 mb-6 leading-relaxed">{department.name}</h3>
            <p className='text-white text-2xl mb-8'>Total Points: {department.points}</p>
            {/* Additional details */}
            
            {/* Button for viewing details */}
            <Link to={`/point/department/${department.name}/points`}>
              <button className="py-2 px-8 bg-yellow-700 font-semibold text-white rounded hover:bg-yellow-800">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighScore;
