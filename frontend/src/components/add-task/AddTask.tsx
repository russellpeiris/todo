import { Button, Flex, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCreateTask } from "../../hooks/tasks";

export const AddTask = () => {
  const [form] = useForm();
  const { mutate, isPending } = useCreateTask();

  const addTask = async () => {
    form.validateFields();
    const newTask = { 
      ...form.getFieldsValue(),
      completed: false
     };
    mutate(newTask);
    form.resetFields();
  };

  return (
    <Flex style={{ flexDirection: "column", width: 400 }}>
      <h2>Add a Task</h2>
      <Form form={form} onFinish={addTask}>
        <Form.Item
          name={"title"}
          rules={[{ required: true, message: "Title is required" }]}
          required
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name={"description"}>
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
