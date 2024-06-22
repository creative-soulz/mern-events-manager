import React from "react";
import { FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useGetParticipantsByDepartmentIdQuery, useRemoveParticipantMutation } from "../../redux/api/participantApiSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ParticipantsByDepartmentId = () => {
  const { departmentId } = useParams();
  const { data: participants, refetch, isLoading, error } = useGetParticipantsByDepartmentIdQuery(departmentId);
  const [deleteParticipant] = useRemoveParticipantMutation();

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
               
              </tr>
            </thead>
            <tbody className="bg-[#1f2833] text-white">
              {participants.map((participant) => (
                <tr key={participant._id}>
                  <td className="px-4 py-2">{participant.name}</td>
                  <td className="px-4 py-2">{participant.rollNo}</td>
                  <td className="px-4 py-2">{participant.year}</td>
                  <td className="px-4 py-2">{participant.event ? participant.event.name : "No event"}</td>
                  
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
