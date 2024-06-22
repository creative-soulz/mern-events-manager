import express from "express";
const router = express.Router();
import {
  createDepartment,
  updateDepartment,
  removeDepartment,
  listDepartment,
  readDepartment,
} from "../controllers/departmentController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin, createDepartment);
router.route("/:departmentId").put(authenticate, authorizeAdmin, updateDepartment);
router
  .route("/:departmentId").delete(authenticate, authorizeAdmin, removeDepartment);

router.route("/department").get(listDepartment);
router.route("/:id").get(readDepartment);

export default router;
