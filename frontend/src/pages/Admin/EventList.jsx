import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateEventMutation } from "../../redux/api/eventApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const EventList = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const navigate = useNavigate();
  const [createEvent] = useCreateEventMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventData = new FormData();

      eventData.append("name", name);
      eventData.append("time", time);
      eventData.append("venue", venue);
      eventData.append("registrationDeadline", registrationDeadline);
      // Add points data as an array of objects
      eventData.append("first", first);
      eventData.append("second", second);
      eventData.append("third", third);

      const { data } = await createEvent(eventData);

      if (data.error) {
        toast.error("Event create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allEvents");
      }
    } catch (error) {
      console.error(error);
      toast.error("Event create failed. Try Again.");
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="inline-flex my-5 ">
      <h1 className="text-2xl font-bold ">Create Event</h1>
      <Link to="/admin/allEvents">
      <Button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mx-5">Manage Events</Button></Link></div>
      <div className="flex flex-col md:flex-row">
        
        <div className="md:w-3/4 p-3">
          <form >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name Of The Event"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="time">Time</label>
                <input
                  type="datetime-local"
                  id="time"
                  className="input-field"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="venue">Venue</label>
                <input
                  type="text"
                  id="venue"
                  placeholder="Venue Of The Event"
                  className="input-field"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="registrationDeadline">Registration Deadline</label>
                <input
                  type="datetime-local"
                  id="registrationDeadline"
                  className="input-field"
                  value={registrationDeadline}
                  onChange={(e) => setRegistrationDeadline(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="first">First Place Points</label>
                <input
                  type="number"
                  id="first"
                  placeholder="First Place Points"
                  className="input-field"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="second">Second Place Points</label>
                <input
                  type="number"
                  id="second"
                  placeholder="Second Place Points"
                  className="input-field"
                  value={second}
                  onChange={(e) => setSecond(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="third">Third Place Points</label>
                <input
                  type="number"
                  id="third"
                  placeholder="Third Place Points"
                  className="input-field"
                  value={third}
                  onChange={(e) => setThird(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mr-2">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventList;
