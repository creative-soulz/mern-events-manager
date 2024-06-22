import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin,authorizeStdRep,authorizeFaculty } from "../middlewares/authMiddleware.js";

import {
  createParticipant,
  getParticipantDetails,
  getParticipantsByEventId,
  getParticipantsByDepartmentId,
  removeParticipant,
  updateParticipantById ,
 
} from "../controllers/participantController.js";

router.post('/create',authenticate, authorizeStdRep, createParticipant);

router
  .route("/:participantId")
  .delete(authenticate, authorizeFaculty, removeParticipant)
  .get(authenticate, authorizeAdmin, getParticipantDetails);
router.get(
  "/participants/:eventId",
  authenticate,
  authorizeFaculty,
  getParticipantsByEventId
);
router.get(
  "/department/:departmentId",
  authenticate,
  authorizeStdRep,
  getParticipantsByDepartmentId
);
router.put('/:id', authenticate,
authorizeStdRep, updateParticipantById);


export default router;
