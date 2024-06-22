import React, { useState, useEffect } from 'react';
import { useGetPrizePointsByEventIdQuery } from '../redux/api/eventApiSlice';

const PrizeSelector = ({ eventId, onClose }) => {
  const { data: prizePoints, isLoading, isError } = useGetPrizePointsByEventIdQuery(eventId);
  const [firstPlace, setFirstPlace] = useState(null);
  const [secondPlace, setSecondPlace] = useState(null);
  const [thirdPlace, setThirdPlace] = useState(null);

  useEffect(() => {
    if (!isLoading && !isError && prizePoints) {
      // Extract data from prizePoints object and set state
      const { first, second, third } = prizePoints;
      setFirstPlace(first);
      setSecondPlace(second);
      setThirdPlace(third);
    }
  }, [prizePoints, isLoading, isError]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Select Prize</h2>
        <div className="flex justify-between mb-4">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
            Close
          </button>
        </div>
        <div className="flex justify-between">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer mr-2">
            First Place ({firstPlace})
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer mr-2">
            Second Place ({secondPlace})
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">
            Third Place ({thirdPlace})
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrizeSelector;
