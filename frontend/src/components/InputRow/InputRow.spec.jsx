import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputRow from ".";
import { Context } from "../../context/taskContext";
import useTaskFunctions from "../../hooks/useTaskFunctions";

// jest.mock("../../hooks/useTaskFunctions", () => ({
//   save: jest.fn(),
//   saveOnEnter: jest.fn(),
// }));

const mockUpdateNewTaskTitle = jest.fn();

const mockTask = {
  title: "",
};

const mockContextValue = {
  updateNewTaskTitle: mockUpdateNewTaskTitle,
  state: { task: mockTask },
};

describe("<InputRow />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input", () => {
    render(
      <Context.Provider value={mockContextValue}>
        <InputRow />
      </Context.Provider>
    );

    const input = screen.getByPlaceholderText("New task");
    expect(input).toBeInTheDocument();
  });

  it("updates the task title when the input changes", async () => {
    render(
      <Context.Provider value={mockContextValue}>
        <InputRow />
      </Context.Provider>
    );

    const input = screen.getByPlaceholderText("New task");
    const newTitle = "New Title";

    await userEvent.type(input, newTitle);

    expect(mockUpdateNewTaskTitle).toHaveBeenCalledTimes(newTitle.length);
  });

  // it("calls saveOnEnter when the enter key is pressed", async () => {
  //   render(
  //     <Context.Provider value={mockContextValue}>
  //       <InputRow />
  //     </Context.Provider>
  //   );

  //   const input = screen.getByPlaceholderText("New task");

  //   await userEvent.type(input, "{enter}");

  //   expect(useTaskFunctions().saveOnEnter).toHaveBeenCalledTimes(1);
  // });
});
