import { DataSource } from "typeorm";
import { Task } from "../entities/Task";

export const db = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 8080,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD ||  'root',
    database: process.env.DB_NAME || 'todo',
    entities: [Task],
    logging: true,
    synchronize: true,
});
