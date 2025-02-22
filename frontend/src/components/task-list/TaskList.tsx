import { Button, Card, Flex, List } from "antd";
import { useEffect, useState } from "react";
import { useCompleteTask, useGetTasks } from "../../hooks/tasks";
import { Task } from "../../interfaces";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, isLoading } = useGetTasks();
  const { complete, updating } = useCompleteTask();

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const markAsDone = (id: number) => {
    complete(id);
  };

  return (
    <Flex style={{ flexDirection: "column", width: 400 }}>
      {isLoading ? (
        <Card loading />
      ) : (
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <Card
              style={{ marginBottom: 10 }}
              title={task.title}
              extra={
                <Button
                  loading={updating}
                  type="default"
                  onClick={() => markAsDone(task.id)}
                >
                  Done
                </Button>
              }
            >
              {task.description}
            </Card>
          )}
        />
      )}
    </Flex>
  );
};

