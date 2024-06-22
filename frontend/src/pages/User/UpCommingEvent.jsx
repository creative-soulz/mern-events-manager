import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useAllEventsQuery } from '../../redux/api/eventApiSlice';

const UpcomingEvent = () => {
  const { data: events, isLoading, isError } = useAllEventsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading Events</div>;
  }

  // Filter events to get only upcoming events
  const upcomingEvents = events.filter(event => moment(event.time).isAfter(moment()));

  // Sort the upcoming events by date
  upcomingEvents.sort((a, b) => moment(a.time).diff(moment(b.time)));

  // Get the next two upcoming events
  const nextTwoEvents = upcomingEvents.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nextTwoEvents.map(event => (
          <Link key={event._id} to={`/events/${event._id}`} className="block">
            <div className="bg-[#1F2833] border border-none rounded-md overflow-hidden">
              <div className="p-4">
                <h5 className="text-xl font-semibold text-white mb-2">{event?.name}</h5>
                <p className="text-gray-400 text-lg">{moment(event.time).format("MMMM Do YYYY")}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvent;
