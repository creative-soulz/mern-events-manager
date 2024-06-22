  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import {
    Card,
    
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useCreateParticipantMutation } from "../../redux/api/participantApiSlice";
  import { useAllEventsQuery } from "../../redux/api/eventApiSlice";
  import { useFetchDepartmentsQuery } from "../../redux/api/departmentApiSlice";
  import { toast } from "react-toastify";

  const CreateParticipant = () => {
    const [name, setName] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [year, setYear] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("");

    const navigate = useNavigate();
    const [createParticipant, { isLoading }] = useCreateParticipantMutation();
    const { data: events, isLoading: eventsLoading, error: eventsError } = useAllEventsQuery();
    const { data: departments, isLoading: departmentsLoading, error: departmentsError } = useFetchDepartmentsQuery();

    useEffect(() => {
      if (events && events.length > 0) {
        setSelectedEvent(events[0]._id);
      }
    }, [events]);

    useEffect(() => {
      if (departments && departments.length > 0) {
        setSelectedDepartment(departments[0]._id);
      }
    }, [departments]);

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await createParticipant({ name, rollNo, year, departmentId: selectedDepartment, eventId: selectedEvent });
        toast.success("Participant created successfully!");
        setName("");
        setRollNo("");
        setYear("");
        setSelectedDepartment("");
        setSelectedEvent("");
          // Navigate to user list after successful creation
      
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    return (
      <div className="mx-auto  max-w-md "> {/* Adjusted width */}
       
          <Typography variant="h4"  className="m-4" color="white">
            Create Participant
          </Typography>
          <form onSubmit={submitHandler} className="mt-5 mb-8 space-y-4">
            <div className="mb-4 m-4">
              <label htmlFor="name" className="block text-white">Name</label>
              <input
                size="lg"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4 m-4">
              <label htmlFor="rollNo" className="block text-white">Roll Number</label>
              <input
                size="lg"
                placeholder="Enter roll number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4 m-4">
              <label htmlFor="year" className="block text-white">Year</label>
              <input
                size="lg"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4 m-4">
              <label htmlFor="department" className="block text-white">Select Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border-gray-300 text-black rounded-md p-2 w-full"
              >
                {departmentsLoading ? (
                  <option>Loading...</option>
                ) : departmentsError ? (
                  <option>Error fetching departments</option>
                ) : (
                  departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="mb-4 m-4">
              <label htmlFor="event" className="block text-white">Select Event</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="border-gray-300 text-black rounded-md p-2 w-full"
              >
                {eventsLoading ? (
                  <option>Loading...</option>
                ) : eventsError ? (
                  <option>Error fetching events</option>
                ) : (
                  events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <Button type="submit" className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {isLoading ? "Creating..." : "Create Participant"}
            </Button>
          </form>
       
      </div>
    );
  };

  export default CreateParticipant;
