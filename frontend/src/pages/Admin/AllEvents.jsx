import React from "react";
import { Link } from "react-router-dom";
import { useAllEventsQuery } from "../../redux/api/eventApiSlice";
import AdminMenu from "./AdminMenu";
import { Button } from "@material-tailwind/react";

const AllEvents = () => {
  const { data: events, isLoading, isError } = useAllEventsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading events</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="p-3 md:w-3/4">
          <div className="ml-8 text-2xl font-bold mb-4">
            Manage Events ({events.length})
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <Link
                key={event._id}
                to={`/admin/event/update/${event._id}`}
                className="flex flex-col justify-between border-none bg-[#263c57] rounded-md overflow-hidden shadow-lg transition duration-300 hover:shadow-xl"
              >
                <div className="p-4">
                  <h5 className="text-xl font-semibold mb-2">{event?.name}</h5>
                </div>
                <div className="flex justify-end p-4">
                  <Button 
                    color="blue"
                    buttonType="filled"
                    size="regular"
                    rounded={true}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    className="text-white"
                  >
                    Update Event
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2">
         
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
