import { DataSource } from "typeorm";
import { Task } from "../entities/Task";

export const db = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 8080,
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD ||  'root',
    database: process.env.POSTGRES_DB || 'todo',
    entities: [Task],
    logging: true,
    synchronize: true,
});
