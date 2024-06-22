import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useGetParticipantsByDepartmentIdQuery, useRemoveParticipantMutation, useUpdateParticipantByIdMutation } from "../../redux/api/participantApiSlice";
import { useAllEventsQuery } from "../../redux/api/eventApiSlice"; // Import the useAllEventsQuery hook
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ParticipantsByDepartmentId = () => {
  const { departmentId } = useParams();
  const { data: participants, refetch, isLoading, error } = useGetParticipantsByDepartmentIdQuery(departmentId);
  const [deleteParticipant] = useRemoveParticipantMutation();
  const [updateParticipant] = useUpdateParticipantByIdMutation();
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useAllEventsQuery(); // Fetch all events

  const [editableParticipantId, setEditableParticipantId] = useState(null);
  const [editableParticipantName, setEditableParticipantName] = useState("");
  const [editableParticipantRollNo, setEditableParticipantRollNo] = useState("");
  const [editableParticipantYear, setEditableParticipantYear] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(""); // State to store the selected event ID
  const [selectedEventName, setSelectedEventName] = useState(""); // State to store the selected event name

  useEffect(() => {
    // Update the selected event ID based on the selected event name
    if (eventsData) {
      const selectedEvent = eventsData.find(event => event.name === selectedEventName);
      if (selectedEvent) {
        setSelectedEventId(selectedEvent._id);
      }
    }
  }, [eventsData, selectedEventName]);

  const deleteHandler = async (participantId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteParticipant(participantId);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (participantId, name, rollNo, year, eventName) => {
    setEditableParticipantId(participantId);
    setEditableParticipantName(name);
    setEditableParticipantRollNo(rollNo);
    setEditableParticipantYear(year);
    setSelectedEventName(eventName); // Set the selected event name
  };

  const updateHandler = async (participantId) => {
    try {
      await updateParticipant({
        participantId: participantId,
        participantData: {
          name: editableParticipantName,
          rollNo: editableParticipantRollNo,
          year: editableParticipantYear,
          eventId: selectedEventId, // Include the selected event ID in the participant data
        },
      });
      setEditableParticipantId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Participants</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-x-auto border border-gray-900 rounded-md">
          <table className="min-w-full">
            <thead className="bg-[#263c57] text-white">
              <tr>
                <th className="px-4 py-2 w-1/5">Name</th>
                <th className="px-4 py-2 w-1/5">RollNo</th>
                <th className="px-4 py-2 w-1/5">Year</th>
                <th className="px-4 py-2 w-1/5">Event</th>
                <th className="px-4 py-2 w-1/5">Edit</th>
                <th className="px-4 py-2 w-1/5">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-[#1f2833] text-white">
              {participants.map((participant) => (
                <tr key={participant._id}>
                  <td className="px-4 py-2">
                    {editableParticipantId === participant._id ? (
                      <input
                        type="text"
                        value={editableParticipantName}
                        onChange={(e) => setEditableParticipantName(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    ) : (
                      participant.name
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableParticipantId === participant._id ? (
                      <input
                        type="text"
                        value={editableParticipantRollNo}
                        onChange={(e) => setEditableParticipantRollNo(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    ) : (
                      participant.rollNo
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableParticipantId === participant._id ? (
                      <input
                        type="text"
                        value={editableParticipantYear}
                        onChange={(e) => setEditableParticipantYear(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    ) : (
                      participant.year
                    )}
                  </td>
                  <td className="px-4 py-2">
  {editableParticipantId === participant._id ? (
    <select
      value={selectedEventName}
      onChange={(e) => setSelectedEventName(e.target.value)}
      className="w-full p-2 border rounded-lg  text-black" // Set background and text color
    >
      {eventsData.map((event) => (
        <option key={event._id} value={event.name}>
          {event.name}
        </option>
      ))}
    </select>
  ) : (
    participant.event ? participant.event.name : "No event"
  )}
</td>
                  <td className="px-4 py-2">
                    {editableParticipantId === participant._id ? (
                      <button
                        onClick={() => updateHandler(participant._id)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                      >
                        <FaCheck />
                      </button>
                    ) : (
                      <FaEdit onClick={() => toggleEdit(participant._id, participant.name, participant.rollNo, participant.year, participant.event ? participant.event.name : "")} className="cursor-pointer ml-[1rem]" />
                    )}
                     </td>
                     <td>
                    <button
                      onClick={() => deleteHandler(participant._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg ml-2"
                    >
                      <TrashIcon className="h-4 w-4"></TrashIcon>
                    </button>
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
    </div>
  );
};

export default ParticipantsByDepartmentId;
