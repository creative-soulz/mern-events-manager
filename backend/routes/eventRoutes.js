import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
  addEvent,
  updateEvent,
  removeEvent,
  fetchEvents,
  fetchEventById,
  fetchAllEvents,
  getPrizePointsByEventId,

} from "../controllers/eventController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(fetchEvents)
  .post(authenticate, authorizeAdmin, formidable(), addEvent);

router.route("/allevents").get(fetchAllEvents);

router
  .route("/:id")
  .get(fetchEventById)
  .put(authenticate, authorizeAdmin, formidable(), updateEvent)
  .delete(authenticate, authorizeAdmin, removeEvent);

  router.get('/:id/prize-points',authenticate, authorizeAdmin, getPrizePointsByEventId);  
export default router;
