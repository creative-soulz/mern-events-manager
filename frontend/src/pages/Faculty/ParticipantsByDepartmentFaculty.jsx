import { Link } from "react-router-dom";
import moment from "moment";
import {  useFetchDepartmentsQuery } from "../../redux/api/departmentApiSlice";

import { Button } from "@material-tailwind/react";

const ParticipantsByDepartment = () => {
  const { data: departments, isLoading, isError } = useFetchDepartmentsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !departments) { // Check if departments is undefined
    return <div>Error loading Department</div>;
  }

  return (
    <>
      <div className="container mx-[9rem]">
        <div className="flex flex-col  md:flex-row">
          <div className="p-3">
            <div className="ml-[2rem] text-xl font-bold h-12">
              Participants of Department ({departments.length ?? 0}) {/* Use nullish coalescing operator */}
            </div>
            <div className="flex flex-col justify-around items-center">
              {departments.map((department) => (
                <div key={department._id} className="block mb-4 overflow-hidden">
                  <div className="flex">
                    <div className="p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {department?.name}
                        </h5>
                      </div>

                      <div className="flex justify-between">
                        <Link
                          to={`/faculty/participants/department/${department._id}`}
                          className="inline-flex items-center bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Show Participants
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
           
          </div>
        </div>
      </div>
    </>
  );
};




export default ParticipantsByDepartment;
