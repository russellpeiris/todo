import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { App as AntdApp } from "antd";
import { describe, expect, it } from "vitest";
import { AddTask } from "..";



describe("AddTask Component", () => {
  it("renders correctly", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AntdApp>
          <AddTask />
        </AntdApp>
      </QueryClientProvider>
    );

    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("shows validation error when title is empty", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AntdApp>
          <AddTask />
        </AntdApp>
      </QueryClientProvider>
    );

    const submitButton = screen.getByRole("button", { name: /Add Task/i });

    fireEvent.click(submitButton);

    expect(await screen.findByText("Title is required")).toBeInTheDocument();
  });
});
