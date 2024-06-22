import Department from "../models/departmentModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createDepartment = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingDepartment = await Department.findOne({ name });

    if (existingDepartment) {
      return res.json({ error: "Already exists" });
    }

    const department = await new Department({ name }).save();
    res.json(department);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateDepartment = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { departmentId } = req.params;

    const department = await Department.findOne({ _id: departmentId });

    if (!department) {
      return res.status(404).json({ error: "department not found" });
    }

    department.name = name;

    const updatedDepartment = await department.save();
    res.json(updatedDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeDepartment = asyncHandler(async (req, res) => {
  try {
    const removed = await Department.findByIdAndDelete(req.params.departmentId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listDepartment = asyncHandler(async (req, res) => {
  try {
    const all = await Department.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readDepartment = asyncHandler(async (req, res) => {
  try {
    const department = await Department.findOne({ _id: req.params.id });
    res.json(department);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export {
  createDepartment,
  updateDepartment,
  removeDepartment,
  listDepartment,
  readDepartment,
};
