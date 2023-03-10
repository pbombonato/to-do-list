import { render, screen } from "@testing-library/react";
import TrashButton from ".";
import { Context } from "../../context/taskContext";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { baseUrl } from "../../constants";

const mockTask = {
  id: 1,
  title: "Task 1",
  isChecked: false,
};

const mockRemoveTask = jest.fn();

const mockContext = {
  removeTaskFromContext: mockRemoveTask,
};

jest.mock("axios");

describe("<TrashButton />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the trash button", () => {
    render(
      <Context.Provider value={mockContext}>
        <TrashButton task={mockTask} />
      </Context.Provider>
    );

    const trashButton = screen.getByRole("button");

    expect(trashButton).toBeInTheDocument();
  });

  it("removes the task when the button is clicked", async () => {
    render(
      <Context.Provider value={mockContext}>
        <TrashButton task={mockTask} />
      </Context.Provider>
    );

    axios.delete.mockResolvedValueOnce({});

    const trashButton = screen.getByRole("button");

    await userEvent.click(trashButton);

    await expect(axios.delete).toHaveBeenCalledWith(
      `${baseUrl}/${mockTask.id}`
    );
    expect(mockRemoveTask).toHaveBeenCalledWith(mockTask);
  });
});
