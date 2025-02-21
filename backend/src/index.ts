import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { db } from "./db/config";
import { taskRouter } from "./router/tasks";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 5000;

db.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));
