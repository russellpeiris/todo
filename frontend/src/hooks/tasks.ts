import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApp from "antd/es/app/useApp";
import axios from "axios";
import { Task } from "../interfaces";

export const useGetTasks = () => {
  const { message } = useApp();
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      return response.data;
    },
  });

  if(error) {
    message.error("An error occurred while fetching tasks");
  }

  return { data, isLoading };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { message } = useApp();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newTask: Task) => {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, newTask);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["tasks"]});
      message.success("Task added successfully");
    },
    onError: () => {
      message.error("An error occurred while creating the task");
    },
  });

  return { mutate, isPending };
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();
  const { message } = useApp();

  const { mutate: complete, isPending: updating } = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["tasks"]});
      message.success("Task marked as completed");
    },
    onError: () => {
      message.error("An error occurred while completing the task");
    },
  });

  return { complete, updating };
};
