import TaskTitle from ".";
import { render, screen } from "@testing-library/react";
import { Context } from "../../context/taskContext";
import userEvent from "@testing-library/user-event";
import axios from "axios";

const mockTask = {
  id: 1,
  title: "Task 1",
  isChecked: false,
  showInput: false,
};

const mockUpdateTask = jest.fn();

const mockContext = {
  updateTaskFromContext: mockUpdateTask,
};

jest.mock("axios");

describe("TaskTitle", () => {
  it("renders the task title", () => {
    render(
      <Context.Provider value={mockContext}>
        <TaskTitle task={mockTask} />
      </Context.Provider>
    );

    const taskTitle = screen.getByText(mockTask.title);

    expect(taskTitle).toBeInTheDocument();
  });

  it("renders the task title as complete", () => {
    const mockTaskComplete = { ...mockTask, isChecked: true };

    render(
      <Context.Provider value={mockContext}>
        <TaskTitle task={mockTaskComplete} />
      </Context.Provider>
    );

    const taskTitle = screen.getByText(mockTaskComplete.title);

    expect(taskTitle).toHaveClass("complete");
  });

  it("renders the input when the showInput property is true", () => {
    const mockTaskWithInput = { ...mockTask, showInput: true };

    render(
      <Context.Provider value={mockContext}>
        <TaskTitle task={mockTaskWithInput} />
      </Context.Provider>
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const span = screen.queryByText(mockTask.title);
    expect(span).not.toBeInTheDocument();
  });

  it("calls the updateTaskFromContext function when the input is blurred", async () => {
    const mockTaskWithInput = { ...mockTask, showInput: true };
    axios.put.mockResolvedValueOnce({ data: mockTaskWithInput });

    render(
      <Context.Provider value={mockContext}>
        <TaskTitle task={mockTaskWithInput} />
      </Context.Provider>
    );

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "New title");
    await userEvent.tab();

    expect(mockUpdateTask).toHaveBeenCalled();
  });

  it("calls the updateTaskFromContext function when the form is submitted", async () => {
    const mockTaskWithInput = { ...mockTask, showInput: true };
    axios.put.mockResolvedValueOnce({ data: mockTaskWithInput });

    render(
      <Context.Provider value={mockContext}>
        <TaskTitle task={mockTaskWithInput} />
      </Context.Provider>
    );

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "New title");
    await userEvent.keyboard("{enter}");

    expect(mockUpdateTask).toHaveBeenCalled();
  });

  it("calls the updateTaskFromContext function when the task title is double clicked", async () => {
    axios.put.mockResolvedValueOnce({ data: mockTask });

    render(
      <Context.Provider value={mockContext}>
        <TaskTitle task={mockTask} />
      </Context.Provider>
    );

    const taskTitle = screen.getByText(mockTask.title);

    await userEvent.dblClick(taskTitle);

    expect(mockUpdateTask).toHaveBeenCalled();
  });
});
