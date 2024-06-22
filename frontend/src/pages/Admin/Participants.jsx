import React from "react";
import { FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetParticipantsByEventIdQuery, useRemoveParticipantMutation } from "../../redux/api/participantApiSlice";
import { useCreatePointMutation } from "../../redux/api/pointApiSlice";
import { useGetPrizePointsByEventIdQuery } from "../../redux/api/eventApiSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ParticipantsByEventId = () => {
  const { eventId } = useParams();
  const { data: participants, refetch, isLoading, error } = useGetParticipantsByEventIdQuery(eventId);
  const [deleteParticipant] = useRemoveParticipantMutation();
  const [createPoint] = useCreatePointMutation();
  const { data: prizePoints } = useGetPrizePointsByEventIdQuery(eventId);

  const { first, second, third } = prizePoints || {}; // Destructure attributes

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

  const createPointHandler = async (participantId, points) => {
   
    if (window.confirm(`Are you sure you want to add ${points} points to this participant?`)) {
      try {
        await createPoint({ participantId, point: points });
        refetch();
        toast.success("Points added successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-white">Participants</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-x-auto border-none  rounded-md">
          <table className="min-w-full">
            <thead className="bg-[#263c57] text-white">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Name</th>
                <th className="px-4 py-3">RollNo</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3 rounded-tr-lg">Place</th>
              </tr>
            </thead>
            <tbody className="bg-[#1f2833] ">
              {participants.map((participant) => (
                <tr key={participant._id} className="text-gray-100">
                  <td className="px-4 py-3">{participant.name}</td>
                  <td className="px-4 py-3">{participant.rollNo}</td>
                  <td className="px-4 py-3">{participant.year}</td>
                  <td className="px-4 py-3">{participant.department ? participant.department.name : 'No department'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteHandler(participant._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {prizePoints && (
                      <>
                        <button
                          className="bg-pink-500 m-3 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600"
                          onClick={() => createPointHandler(participant._id, first)}
                        >
                          First
                        </button>
                        <button
                          className="bg-pink-500 m-3 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600"
                          onClick={() => createPointHandler(participant._id, second)}
                        >
                          Second
                        </button>
                        <button
                          className="bg-pink-500 m-3 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600"
                          onClick={() => createPointHandler(participant._id, third)}
                        >
                          Third
                        </button>
                      </>
                    )}
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

export default ParticipantsByEventId;
