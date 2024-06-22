import Participant from "../models/participantModel.js";
import Event from "../models/eventModel.js";
import Department from "../models/departmentModel.js"


const createParticipant = async (req, res) => {
  try {
    const { name,rollNo,year,departmentId, eventId } = req.body;

    // Check if the participant already exists for the given user and event
    const existingParticipant = await Participant.findOne({
      name:name,rollNo:rollNo,year:year,department:departmentId,
      event: eventId,
    });

    if (existingParticipant) {
      // User has already registered for the event
      return res
        .status(400)
        .json({ error: "User already registered for the event" });
    }

    // Create a new Participant instance with user and event IDs
    const participant = new Participant({
      name:name,rollNo:rollNo,year:year,department:departmentId,
      event: eventId,
    });

    // Save the participant to the database
    const createdParticipant = await participant.save();

    // Respond with the created participant
    res.status(201).json(createdParticipant);
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};

const getParticipantDetails = async (req, res) => {
  try {
    const { participantId } = req.params;

    // Fetch participant details based on participant ID and populate event and department details
    const participant = await Participant.findById(participantId)
      .populate({
        path: "event",
        select: "name" // Select only the name field from the event document
      })
      .populate({
        path: "Department",
        select: "name" // Select only the name field from the department document
      });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found." });
    }
    
    // Extract required fields from the participant document
    const { name, rollNo, year, department, event } = participant;

    // Respond with the extracted participant details
    res.status(200).json({ name, rollNo, year, departmentname: department.name, eventname: event.name });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};



// const getParticipantDetails = async (req, res) => {
//   try {
//     const { participantId } = req.params;

//     // Fetch participant details based on participant ID and populate user and event details
//     const participant = await Participant.findById(participantId)
//       .populate({
//         path: "user",
//       })
//       .populate("event");

//     // Respond with the participant details with populated user and event details
//     res.status(200).json(participant);
//   } catch (error) {
//     // Handle errors and respond with an error message
//     res.status(500).json({ error: error.message });
//   }
// };





const getParticipantsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch participants based on the event ID and populate the department field
    const participants = await Participant.find({ event: eventId }).populate({
      path: 'department',
      select: 'name' // Populate only the name field from the department
    });

    if (participants.length === 0) {
      return res.status(404).json({ message: "No participants found for the given event." });
    }

    // Respond with the participants
    res.status(200).json(participants);
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};

const getParticipantsByDepartmentId = async (req, res) => {
  try {
    const { departmentId } = req.params;

    // Fetch participants based on the event ID and populate the department field
    const participants = await Participant.find({ department: departmentId }).populate({
      path: 'event',
      select: 'name' // Populate only the name field from the department
    });

    if (participants.length === 0) {
      return res.status(404).json({ message: "No participants found for the given department." });
    }

    // Respond with the participants
    res.status(200).json(participants);
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};


export default getParticipantsByEventId;


const removeParticipant = async (req, res) => {
  try {
    const { participantId } = req.params;

    // Remove the participant from the database by ID
    const removedParticipant = await Participant.findByIdAndDelete(
      participantId
    );

    if (!removedParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.json({
      message: "Participant removed successfully",
      removedParticipant,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getParticipantsByDepartmentId = async (req, res) => {
//   try {
//     const { departmentId } = req.params;

//     // Fetch participants and populate user and event details
//     const participants = await Participant.find()
//       .populate({
//         path: "user",
//         match: { department: mongoose.Types.ObjectId(departmentId) },
//       })
//       .populate("event");

//     // Filter out participants without matching user details
//     const filteredParticipants = participants.filter(
//       (participant) => participant
//     );

//     // Respond with the participants with populated details
//     res.status(200).json(filteredParticipants);
//   } catch (error) {
//     // Handle errors and respond with an error message
//     res.status(500).json({ error: error.message });
//   }
// };
const updateParticipantById = async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  if (participant) {
    participant.name = req.body.name || participant.name;
    participant.rollNo = req.body.rollNo || participant.rollNo;
    participant.year = req.body.year || participant.year;
    participant.department = req.body.departmentId || participant.department;
    participant.event = req.body.eventId || participant.event;

    const updatedParticipant = await participant.save();

    res.json({
      _id: updatedParticipant._id,
      name: updatedParticipant.name,
      rollNo: updatedParticipant.rollNo,
      year: updatedParticipant.year,
      department: updatedParticipant.department,
      event: updatedParticipant.event,
    });
  } else {
    res.status(404);
    throw new Error("Participant not found");
  }
};


export {
  createParticipant,
  getParticipantDetails,
  getParticipantsByEventId,
  getParticipantsByDepartmentId,
  removeParticipant,
  updateParticipantById,
};
