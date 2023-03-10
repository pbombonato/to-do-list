import TaskTable from ".";
import { render, screen } from "@testing-library/react";
import { Context } from "../../context/taskContext";
import axios from "axios";

jest.mock("axios");

const mockTask = {
  id: 1,
  title: "Task 1",
  isChecked: false,
};

const mockUpdateTaskList = jest.fn();

const mockContext = {
  contextTaskList: [mockTask],
  updateTaskList: mockUpdateTaskList,
};

describe("TaskTable", () => {
  it("renders the task table", () => {
    axios.mockResolvedValueOnce({ data: [mockTask] });

    render(
      <Context.Provider value={mockContext}>
        <TaskTable />
      </Context.Provider>
    );

    const taskTable = screen.getByRole("list");

    expect(taskTable).toBeInTheDocument();
  });

  it("renders the task rows", async () => {
    axios.mockResolvedValueOnce({ data: [mockTask] });

    render(
      <Context.Provider value={mockContext}>
        <TaskTable />
      </Context.Provider>
    );

    const taskRow = await screen.findByRole("listitem");

    expect(taskRow).toBeInTheDocument();
  });

  it("renders the input row", async () => {
    axios.mockResolvedValueOnce({ data: [mockTask] });

    render(
      <Context.Provider value={mockContext}>
        <TaskTable />
      </Context.Provider>
    );

    const inputRow = await screen.findByRole("textbox");

    expect(inputRow).toBeInTheDocument();
  });

  it("renders the complete task rows", async () => {
    axios.mockResolvedValueOnce({ data: [mockTask] });

    render(
      <Context.Provider value={mockContext}>
        <TaskTable />
      </Context.Provider>
    );

    const completeTaskRow = await screen.findByRole("listitem");

    expect(completeTaskRow).toBeInTheDocument();
  });

  it("updates the task list", async () => {
    axios.mockResolvedValueOnce({ data: [mockTask] });

    render(
      <Context.Provider value={mockContext}>
        <TaskTable />
      </Context.Provider>
    );

    await screen.findByRole("listitem");

    expect(mockUpdateTaskList).toHaveBeenCalledWith([mockTask]);
  });
});
