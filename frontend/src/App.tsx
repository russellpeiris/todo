import { Button, Card, Flex, Input, List } from "antd";
import "antd/dist/reset.css";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addTask = () => {
    if (!title) return;
    const newTask = { id: Date.now(), title, description, completed: false };
    setTasks([newTask, ...tasks.slice(0, 4)]);
    setTitle("");
    setDescription("");
  };

  const markAsDone = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
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
          type="primary"
          onClick={addTask}
          style={{ width: "fit-content", alignSelf: "flex-end" }}
        >
          Add
        </Button>
      </Flex>
      <div className="vl"></div>
      <Flex style={{ flexDirection: "column", width: 400 }}>
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <Card
              style={{ marginBottom: 10 }}
              title={task.title}
              extra={
                <Button type="default" onClick={() => markAsDone(task.id)}>
                  Done
                </Button>
              }
            >
              {task.description}
            </Card>
          )}
        />
      </Flex>
    </Flex>
  );
};

export default App;
