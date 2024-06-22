import { Link } from "react-router-dom";
import moment from "moment";
import { useAllEventsQuery } from "../../redux/api/eventApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreateParticipantMutation } from "../../redux/api/participantApiSlice";
import { toast } from "react-toastify";
import SidebarWithBurgerMenu from "../Admin/Navigation";

const AllEvents = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [createParticipant] = useCreateParticipantMutation();

  const handleParticipation = async (eventId) => {
    if (!userInfo || !userInfo._id) {
      console.log("Please log in");
      return;
    }

    console.log("Handle Participation Clicked");
    console.log("User ID:", userInfo._id);
    console.log("Event ID:", eventId);

    try {
      // Check if the user has already participated in the event
      const existingParticipant = events.find(
        (event) => event.user?._id === userInfo._id && event._id === eventId
      );

      if (existingParticipant) {
        // User has already participated, show an error message or handle accordingly
        console.log("You have already registered for this event");
        return;
      }

      // Call the mutation with the user ID and event ID
      await createParticipant({
        userId: userInfo._id,
        eventId,
      });

      toast.success("Participant added to the Event");
      console.log("Participant created successfully");
    } catch (error) {
      console.error("Error creating participant:", error);
    }
  };

  const { data: events, isLoading, isError } = useAllEventsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading Events</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-4">All Events ({events.length})</h1>
        <div className="grid gap-4">
          {events.map((event) => (
            <div key={event._id} className="bg-[#1F2833] rounded-md overflow-hidden">
              <div className="p-4">
                <h5 className="text-xl font-semibold text-white mb-2">{event?.name}</h5>
                <p className="text-gray-400 text-sm">{event?.venue}...</p>
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-gray-300">Register before: {moment(event.registrationDeadline).format("MMMM Do YYYY")}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllEvents;
