import request from "supertest";
import { app } from "..";
import { db } from "../db/config";
import { Task } from "../entities/Task";

describe('Todo API Tests', () => {
  beforeAll(async () => {
    await db.initialize();
  });

  afterAll(async () => {
    await db.destroy();
  });

  beforeEach(async () => {
    await db.getRepository(Task).clear();
  });

  test('Should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'Test Description' });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Task added successfully');
  });

  test('Should fetch uncompleted tasks', async () => {
    await db.getRepository(Task).save([
      { title: 'Task 1', description: 'Description 1', isCompleted: false },
      { title: 'Task 2', description: 'Description 2', isCompleted: true },
    ]);

    const response = await request(app).get('/api/tasks');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1); 
    expect(response.body[0].title).toBe('Task 1');
  });

  test('Should mark a task as completed', async () => {
    const task = await db.getRepository(Task).save({
      title: 'Task to Complete',
      description: 'Complete me',
      isCompleted: false,
    });

    const response = await request(app).patch(`/api/tasks/${task.id}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task marked as completed');

    const updatedTask = await db.getRepository(Task).findOneBy({ id: task.id });
    expect(updatedTask?.isCompleted).toBe(true);
  });

  test('Should return 400 if title is missing', async () => {
    const response = await request(app).post('/api/tasks').send({ description: 'Missing title' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Title is required');
  });

  test('Should return 404 if task to mark as completed does not exist', async () => {
    const nonExistentTaskId = 9999; 
    const response = await request(app).patch(`/api/tasks/${nonExistentTaskId}`);
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Task not found');
  });
});