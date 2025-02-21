import { Button, Card, Flex, Input, List } from "antd";
import "antd/dist/reset.css";
import useApp from "antd/es/app/useApp";
import { useEffect, useState } from "react";
import { useCompleteTask, useCreateTask, useGetTasks } from "./hooks/tasks";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const {
    complete,
    updating,
  } = useCompleteTask();
  const { data, isLoading, error } = useGetTasks();
  const { mutate, isPending } = useCreateTask();
  const { message } = useApp();

  const addTask = async () => {
    if (!title) return;
    const newTask = { id: Date.now(), title, description, completed: false };
    mutate(newTask);
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  useEffect(() => {
    if(error) {
      message.error(`Error: ${error}`);
    }

  }, [ error, message]);

  const markAsDone = (id: number) => {
    complete(id);
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      {isLoading ? (
        <Card loading />
      ) : (
        <>
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
          <div className="vl"></div>
          <Flex style={{ flexDirection: "column", width: 400 }}>
            <List
              dataSource={tasks}
              renderItem={(task) => (
                <Card
                  style={{ marginBottom: 10 }}
                  title={task.title}
                  extra={
                    <Button loading={updating} type="default" onClick={() => markAsDone(task.id)}>
                      Done
                    </Button>
                  }
                >
                  {task.description}
                </Card>
              )}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default App;
