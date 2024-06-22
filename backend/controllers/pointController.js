import Point from "../models/pointModel.js";
import Participant from "../models/participantModel.js";

import Event from "../models/eventModel.js";


const createPoint = async (req, res) => {
  try {
    const { participantId, point } = req.body;

    const newPoint = new Point({ participant: participantId, point });
    await newPoint.save();

    res.status(201).json({ message: "Point created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPointDetails = async (req, res) => {
  try {
    const { pointId } = req.params;
    const { generateWinnersList } = req.query;

    if (generateWinnersList === 'true') {
      const points = await Point.find().populate({
        path: "participant",
        populate: [
          { 
            path: "participant", 
            select: "username department year rollNo",
           
          },
          { 
            path: "event",
            select: "name" // Only select the name field from the event
          }
        ]
      });

      // Construct winners list
      const winnersList = points.map(point => ({
        participant: {
          username: point.participant.name,
          department: point.participant.department, // Access department name
          year: point.participant.year
        },
        event: {
          name: point.participant.event.name,
        }
      }));

      res.status(200).json(winnersList);
    } else {
      const point = await Point.findById(pointId).populate({
        path: "participant",
        populate: [
          { 
            path: "participant", 
            select: "username department year rollno",
            populate: { path: "department" } // Populate the department field in the User model
          },
          { 
            path: "event",
            select: "name" // Only select the name field from the event
          }
        ]
      });

      if (!point) {
        return res.status(404).json({ message: "Point not found" });
      }

      res.status(200).json(point);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getAllPoints = async (req, res) => {
  try {
    const { generateWinnersList } = req.query;

    if (generateWinnersList === 'true') {
      const points = await Point.find().populate({
        path: "participant",
        select: "name  year rollNo",
        populate: [
          { 
            path: "department",
            select: "name" // Only select the name field from the event
          },
          { 
            path: "event",
            select: "name" // Only select the name field from the event
          }
        ]
      });

      // Construct winners list
      const winnersList = points.map(point => ({
        participant: {
          username: point.participant.name,
          department: point.participant.department.name, // Access department name
          year: point.participant.year,
          rollNo: point.participant.rollNo
        },
        event: {
          name: point.participant.event.name,
        }
      }));

      res.status(200).json(winnersList);
    } else {
      const points = await Point.find().populate({
        path: "participant",
        select: "name  year rollNo",
        populate: [
          {
            path:"department",
            select:"name"
          },
          { 
            path: "event",
            select: "name" // Only select the name field from the event
          }
        ]
      });

      res.status(200).json(points);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePoint = async (req, res) => {
  try {
    const { pointId } = req.params;
    const { point } = req.body;

    const updatedPoint = await Point.findByIdAndUpdate(
      pointId,
      { point },
      { new: true }
    );

    if (!updatedPoint) {
      return res.status(404).json({ message: "Point not found" });
    }

    res.status(200).json(updatedPoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePoint = async (req, res) => {
  try {
    const { pointId } = req.params;

    const deletedPoint = await Point.findByIdAndDelete(pointId);

    if (!deletedPoint) {
      return res.status(404).json({ message: "Point not found" });
    }

    res.status(200).json({ message: "Point deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const fetchPointsByDepartment = async (req, res) => {
  try {
    // Fetch all points with populated participant details
    const points = await Point.find().populate({
      path: "participant", // Ensure that this matches the field name in your schema
      select: "name year rollNo",
      populate: [
        { 
          path: "department", // Ensure that this matches the field name in your schema
          select: "name"
        },
        { 
          path: "event",
          select: "name" // Only select the name field from the event
        }
      ]
    });

    // Group points by department and calculate total points for each department
    const departmentPoints = {};
    points.forEach(point => {
      if (point.participant && point.participant.department) {
        const departmentName = point.participant.department.name;
        const pointsValue = point.point || 0; // Use 0 if point is undefined
        departmentPoints[departmentName] = (departmentPoints[departmentName] || 0) + pointsValue;
      }
    });

    res.status(200).json(departmentPoints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


//fetching points for each department

const fetchPointsForDepartment = async (req, res) => {
  try {
    const { departmentName } = req.params;

    // Fetch all points with populated participant details
    const points = await Point.find().populate({
      path: "participant",
      select: "name year rollNo",
      populate: [
        { 
          path: "department", // Ensure that this matches the field name in your schema
          select: "name"
        },
        { 
          path: "event",
          select: "name" // Only select the name field from the event
        }
      ]
    });

    // Filter points for the specified department
    const departmentPoints = points.filter(point => {
      // Ensure that point.participant and point.participant.department are not null before accessing their properties
      return point.participant && point.participant.department && point.participant.department.name === departmentName;
    });

    // Calculate total points for the department
    let departmentTotalPoints = 0;
    departmentPoints.forEach(point => {
      departmentTotalPoints += point.point || 0; // Use 0 if point is undefined
    });

    // Return department points and total points in the response
    res.status(200).json({
      departmentPoints,
      departmentTotalPoints: { total: departmentTotalPoints }, // Including total points
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


  



  
export {
  createPoint,
  getPointDetails,
  getAllPoints,
  updatePoint,
  deletePoint,
  fetchPointsByDepartment,
  fetchPointsForDepartment,
  
};
