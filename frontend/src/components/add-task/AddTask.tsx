import { Button, Flex, Input } from 'antd';
import { useState } from 'react';
import { useCreateTask } from '../../hooks/tasks';

export const AddTask = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { mutate, isPending } = useCreateTask();
  

      const addTask = async () => {
        if (!title) return;
        const newTask = { id: Date.now(), title, description, completed: false };
        mutate(newTask);
        setTitle("");
        setDescription("");
      };
    

  return (
    <Flex style={{ flexDirection: "column", width: 400 }}>
    <h2>Add a Task</h2>
    <Input
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={{ marginBottom: 10 }}
    />
    <Input.TextArea
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      style={{ marginBottom: 10 }}
    />
    <Button
      loading={isPending}
      type="primary"
      onClick={addTask}
      style={{ width: "fit-content", alignSelf: "flex-end" }}
    >
      Add
    </Button>
  </Flex>
  )
}
