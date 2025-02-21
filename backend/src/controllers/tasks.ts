import { Request, Response } from "express";
import { Task } from "../entities/Task";
import { db } from "../db/config";

export const createTask = async (req: Request, res: Response): Promise<any> => {
    const { title, description } = req.body;
    if (!title) 
        return res.status(400).json({ error: "Title is required" });

    try {
        const taskRepo = db.getRepository(Task);
        const task = taskRepo.create({ title, description, isCompleted: false });
        await taskRepo.save(task);
        res.status(201).json({ message: "Task added successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the task" });
    }
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const taskRepo = db.getRepository(Task);
        const tasks = await taskRepo.find({
            where: { isCompleted: false },
            order: { createdAt: "DESC" },
            take: 5,
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the tasks" });
    }
}

export const completeTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const taskRepo = db.getRepository(Task);
        await taskRepo.update(id, { isCompleted: true });
        res.json({ message: "Task marked as completed" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while completing the task" });
    }
}