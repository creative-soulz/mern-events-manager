import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventByIdQuery,
} from "../../redux/api/eventApiSlice";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Button } from "@material-tailwind/react";

const AdminEventUpdate = () => {
  const params = useParams();
  const { data: eventData } = useGetEventByIdQuery(params._id);
  const [name, setName] = useState(eventData?.name || "");
  const [time, setTime] = useState(eventData?.time || "");
  const [venue, setVenue] = useState(eventData?.venue || "");
  const [registrationDeadline, setRegistrationDeadline] = useState(
    eventData?.registrationDeadline || ""
  );
  const [first, setFirst] = useState(eventData?.first || ""); 
  const [second, setSecond] = useState(eventData?.second || ""); 
  const [third, setThird] = useState(eventData?.third || ""); 
  const navigate = useNavigate();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  useEffect(() => {
    if (eventData && eventData._id) {
      setName(eventData.name);
      setTime(eventData.time);
      setVenue(eventData.venue);
      setRegistrationDeadline(eventData.registrationDeadline);
      setFirst(eventData.first);
      setSecond(eventData.second);
      setThird(eventData.third);
    }
  }, [eventData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("time", format(new Date(time), "yyyy-MM-dd"));
      formData.append("venue", venue);
      formData.append("first", first);
      formData.append("second", second);
      formData.append("third", third);
      formData.append(
        "registrationDeadline",
        format(new Date(registrationDeadline), "yyyy-MM-dd")
      );

      const data = await updateEvent({ eventId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Event successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allevents");
      }
    } catch (err) {
      console.log(err);
      toast.error("Event update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this Event?"
      );
      if (!answer) return;

      const { data } = await deleteEvent(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allevents");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="container xl:mx-[9rem] sm:mx-0">
        <div className="flex flex-col md:flex-row">
          
          <div className="md:w-3/4 p-3">
            <div className="ml-8 text-2xl font-bold mb-4">Manage Events</div>
            <div className="p-3">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="time">Time</label>
                    <input
                      type="datetime-local"
                      className="input-field"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="venue">Venue</label>
                    <input
                      type="text"
                      className="input-field"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="registrationDeadline">Registration Deadline</label>
                    <input
                      type="datetime-local"
                      className="input-field"
                      value={registrationDeadline}
                      onChange={(e) => setRegistrationDeadline(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="first">First Place Points</label>
                    <input
                      type="number"
                      className="input-field"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="second">Second Place Points</label>
                    <input
                      type="number"
                      className="input-field"
                      value={second}
                      onChange={(e) => setSecond(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="third">Third Place Points</label>
                    <input
                      type="number"
                      className="input-field"
                      value={third}
                      onChange={(e) => setThird(e.target.value)}
                    />
                  </div>
                </div>
                <div className="my-6">
                  <Button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mx-2">Update</Button>
                  <Button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mx-2" onClick={handleDelete}>Delete</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEventUpdate;
