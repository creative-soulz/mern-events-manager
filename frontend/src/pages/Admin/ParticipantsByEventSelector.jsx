import { Link } from "react-router-dom";
import moment from "moment";
import { useAllEventsQuery } from "../../redux/api/eventApiSlice";
import AdminMenu from "./AdminMenu";
import { Button } from "@material-tailwind/react";

const ParticipantsByEvent = () => {
  const { data: events, isLoading, isError } = useAllEventsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container mx-[1rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className=" inline-flex my-5">
            <div className=" text-xl font-bold h-12">
              Participants of Events ({events.length})

            </div>
            <Link to="/admin/pointlist">
              <Button  className="bg-blue-500 mx-5  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" ripple="light">
                Manage Points
              </Button>
            </Link></div>
            <div className="grid  mx-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <div key={event._id} className="bg-[#1F2833] rounded-lg shadow-md p-4">
                  <h5 className="text-xl font-semibold mb-2">{event?.name}</h5>
                  <Button
                  ripple="light"
                   className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                  <Link
                    to={`/admin/participants/events/${event._id}/participants`}
                   
                  >
                    Show Participants
                  </Link></Button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
           
          </div>
          <div className="">
           
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantsByEvent;
