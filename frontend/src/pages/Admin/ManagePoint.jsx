import React, { useState } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetAllPointsQuery, useUpdatePointMutation, useDeletePointMutation } from "../../redux/api/pointApiSlice";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

const ManagePoint = () => {
  const { data: points, isLoading, error } = useGetAllPointsQuery({ generateWinnersList: false });
  const [updatePoint] = useUpdatePointMutation();
  const [deletePoint] = useDeletePointMutation();
  const [editedPoints, setEditedPoints] = useState({});

  const handleEdit = (pointId, editedPoint) => {
    setEditedPoints({ ...editedPoints, [pointId]: editedPoint });
  };

  const handleUpdate = async (pointId) => {
    try {
      await updatePoint({ pointId, point: editedPoints[pointId] });
      toast.success("Point updated successfully!");
      setEditedPoints({});
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDelete = async (pointId) => {
    if (window.confirm("Are you sure you want to delete this point?")) {
      try {
        await deletePoint(pointId);
        toast.success("Point deleted successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="py-4 px-6 ">
        <h1 className="text-2xl font-semibold mb-4 text-white">Manage Points</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <div className="overflow-x-auto border border-none rounded-md">
            <table className="min-w-full text-white ">
              <thead className="bg-[#263c57] text-white">
                <tr>
                  <th className="px-4 py-2">Participant</th>
                  <th className="px-4 py-2">RollNo</th>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Event</th>
                  <th className="px-4 py-2">Point</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-[#1f2833] ">
                {points.map((point) => (
                  <tr key={point._id} className="">
                    <td className="px-4 py-2">{point.participant ? point.participant.name : 'N/A'}</td>
                    <td className="px-4 py-2">{point.participant ? point.participant.rollNo : 'N/A'}</td>
                    <td className="px-4 py-2">{point.participant ? point.participant.year : 'N/A'}</td>
                    <td className="px-4 py-2">{point.participant ? point.participant.department.name : 'N/A'}</td>
                    <td className="px-4 py-2">{point.participant ? point.participant.event.name : 'N/A'}</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={editedPoints[point._id] || point.point}
                        onChange={(e) => handleEdit(point._id, e.target.value)}
                        className="bg-gray-800 text-white rounded px-3 py-1 "
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mr-2" onClick={() => handleUpdate(point._id)}>Update</Button>
                      <Button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"  onClick={() => handleDelete(point._id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePoint;
