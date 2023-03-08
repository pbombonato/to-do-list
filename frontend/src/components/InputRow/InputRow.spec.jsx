import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputRow from ".";

const mockSaveNewTaskToDB = jest.fn();

// mocking useTaskFunctions Hook
jest.mock("../../hooks/useTaskFunctions", () => {
  return () => {
    return { saveNewTaskToDB: mockSaveNewTaskToDB };
  };
});

describe("<InputRow />", () => {
  it("renders the input", () => {
    render(<InputRow />);

    const input = screen.getByPlaceholderText("New task");
    expect(input).toBeInTheDocument();
  });

  it("updates the task title when the user types", async () => {
    render(<InputRow />);

    const input = screen.getByPlaceholderText("New task");
    const newTitle = "New Title";

    await userEvent.type(input, newTitle);

    expect(input).toHaveValue(newTitle);
  });

  it("calls saveNewTaskToDB when the user submits the form", async () => {
    render(<InputRow />);

    const input = screen.getByPlaceholderText("New task");
    const newTitle = "New Title";

    await userEvent.type(input, newTitle);
    await userEvent.click(screen.getByRole("button"));

    expect(mockSaveNewTaskToDB).toHaveBeenCalledWith(newTitle);
  });

  it("empties the input when the user submits the form", async () => {
    render(<InputRow />);

    const input = screen.getByPlaceholderText("New task");
    const newTitle = "New Title";

    await userEvent.type(input, newTitle);
    await userEvent.click(screen.getByRole("button"));

    expect(input).toHaveValue("");
  });
});
