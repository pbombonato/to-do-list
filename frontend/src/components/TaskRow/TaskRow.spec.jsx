import { render, screen } from "@testing-library/react";
import TaskRow from ".";
import { Context } from "../../context/taskContext";

const mockTask = {
  id: 1,
  title: "Task 1",
  isChecked: false,
};

describe("<TaskRow />", () => {
  it("renders the task passed as props", () => {
    render(
      <Context.Provider value={{}}>
        <TaskRow task={mockTask} />
      </Context.Provider>
    );

    const task = screen.getByText(mockTask.title);
    expect(task).toBeInTheDocument();
  });

  it("renders the checkbox", () => {
    render(
      <Context.Provider value={{}}>
        <TaskRow task={mockTask} />
      </Context.Provider>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("renders the trash button", () => {
    render(
      <Context.Provider value={{}}>
        <TaskRow task={mockTask} />
      </Context.Provider>
    );

    const trashButton = screen.getByRole("button");
    expect(trashButton).toBeInTheDocument();
  });
});
