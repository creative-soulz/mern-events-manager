// controllers/eventController.js
import asyncHandler from "../middlewares/asyncHandler.js";
import Event from "../models/eventModel.js";
import { format } from "date-fns";

const addEvent = asyncHandler(async (req, res) => {
  try {
    const { name, time, venue, registrationDeadline,first,second,third } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !time:
        return res.json({ error: "Time is required" });
      case !venue:
        return res.json({ error: "Venue is required" });
      case !registrationDeadline:
        return res.json({ error: "Registration deadline is required" });
        case !first:
        return res.json({ error: "First place point is required" });
        case !second:
        return res.json({ error: "second place point is required" });
        case !third:
        return res.json({ error: "third place point is required" });
    }

    // Format the date before saving
    const formattedTime = format(new Date(time), "yyyy-MM-dd'T'HH:mm");
    const formattedRegistrationDeadline = format(
      new Date(registrationDeadline),
      "yyyy-MM-dd'T'HH:mm"
    );
    const event = new Event({
      name,
      time: formattedTime,
      venue,
      registrationDeadline: formattedRegistrationDeadline,
      first,second,third
    });

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateEvent = asyncHandler(async (req, res) => {
  try {
    const { name, time, venue, registrationDeadline,first,second,third } = req.fields;

    // Parse date strings into Date objects
    const parsedTime = new Date(time);
    const parsedRegistrationDeadline = new Date(registrationDeadline);

    // Validation for date strings
    if (
      isNaN(parsedTime.valueOf()) ||
      isNaN(parsedRegistrationDeadline.valueOf())
    ) {
      return res.status(400).json({
        error:
          "Invalid date format. Check time and registrationDeadline fields.",
      });
    }

    // Format dates in "yyyy-MM-dd" format
    const formattedTime = format(new Date(time), "yyyy-MM-dd'T'HH:mm");
    const formattedRegistrationDeadline = format(
      new Date(registrationDeadline),
      "yyyy-MM-dd'T'HH:mm"
    );

    // Validation for other fields
    if (!name || !venue ||!first||!second|| !third) {
      return res
        .status(400)
        .json({ error: "Invalid data. Check input fields." });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        name,
        time: formattedTime,
        venue,
        registrationDeadline: formattedRegistrationDeadline,
        first,second,third
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



const removeEvent = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchEvents = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Event.countDocuments({ ...keyword });
    const events = await Event.find({ ...keyword }).limit(pageSize);

    res.json({
      events,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchEventById = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      return res.json(event);
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Event not found" });
  }
});

const fetchAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find({}).limit(12).sort({ createAt: -1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


const getPrizePointsByEventId = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Extract first, second, and third prize points from the event
    const { first, second, third } = event;

    res.status(200).json({ first, second, third });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


export {
  addEvent,
  updateEvent,
  removeEvent,
  fetchEvents,
  fetchEventById,
  fetchAllEvents,
  getPrizePointsByEventId,
};
