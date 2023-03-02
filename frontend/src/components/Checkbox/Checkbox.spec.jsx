import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Checkbox from ".";
import { Context } from "../../context/taskContext";
import { baseUrl } from "../../constants";

jest.mock("axios");

const mockUpdateTask = jest.fn();

const mockTask = {
  id: 1,
  title: "Test Task",
  isChecked: false,
};

const mockContextValue = {
  updateTask: mockUpdateTask,
};

describe("<Checkbox />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the checkbox input", () => {
    render(
      <Context.Provider value={mockContextValue}>
        <Checkbox task={mockTask} />
      </Context.Provider>
    );

    const checkboxInput = screen.getByRole("checkbox");
    expect(checkboxInput).toBeInTheDocument();
  });

  it("checks the checkbox and updates the task when clicked", async () => {
    const resp = { data: { ...mockTask, isChecked: true } };
    axios.put.mockResolvedValue(resp);

    render(
      <Context.Provider value={mockContextValue}>
        <Checkbox task={mockTask} />
      </Context.Provider>
    );
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      baseUrl + "/" + mockTask.id,
      {
        title: mockTask.title,
        isChecked: true,
      }
    );

    const updatedCheckbox = await screen.findByRole("checkbox", {
      checked: true,
    });
    expect(updatedCheckbox).toBeInTheDocument();
  });
});
