import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

import {
  createPoint,
  getPointDetails,
  getAllPoints,
  updatePoint,
  deletePoint,
  fetchPointsByDepartment,
  fetchPointsForDepartment,


} from "../controllers/pointController.js";

router.route("/")
  .post(authenticate,authorizeAdmin, createPoint)
  .get(getAllPoints);

router.route("/:pointId")
  .get(authenticate,authorizeAdmin, getPointDetails)
  .put(authenticate,authorizeAdmin, updatePoint)
  .delete(authenticate,authorizeAdmin, deletePoint);


router.get("/points/department", fetchPointsByDepartment);
router.get('/department/:departmentName/points',fetchPointsForDepartment);


export default router;
