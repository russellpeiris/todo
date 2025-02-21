import { Router } from "express";
import { completeTask, createTask, getTasks } from "../controllers/tasks";

export const taskRouter = Router();

taskRouter.post("/", createTask);
taskRouter.get("/", getTasks);
taskRouter.patch("/:id", completeTask);