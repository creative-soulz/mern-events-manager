import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
 import departmentRoutes from "./routes/departmentRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

import participantRoutes from "./routes/participantRoutes.js";
 import pointRoutes from "./routes/pointRoutes.js";

dotenv.config();
const port = process.env.port || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
 app.use("/api/department", departmentRoutes);
app.use("/api/events", eventRoutes);

 app.use("/api/participants", participantRoutes);
  app.use("/api/point",pointRoutes);

app.listen(port, () => console.log(`Server is running on port:${port}`));
