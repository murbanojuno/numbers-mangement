import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux"; // Import Provider
import { store } from "../../app/store"; // Import the Redux store
import RegisterPage from "../../features/numbers/RegisterPage";
import { act } from "react";

// Mock the useAddNumberMutation hook
const addNumberMock = vi.fn();
vi.mock("../../features/numbers/api", async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useAddNumberMutation: () => [addNumberMock, { isLoading: false }],
  };
});

describe("Register Page", () => {
  const renderWithProvider = (component: React.ReactNode) => {
    render(<Provider store={store}>{component}</Provider>);
  };

  it("submits the form and calls addNumber mutation for a single number", async () => {
    renderWithProvider(<RegisterPage />);

    // Simulate user interaction
    const input = screen.getByLabelText("Single Number");
    const submitButton = screen.getByText("Add Number");

    await act(async () => {
      await userEvent.type(input, "12345");
      await userEvent.click(submitButton);
    });

    // Assert that the mutation was called with the correct data
    expect(addNumberMock).toHaveBeenCalledWith({ number: "12345" });
  });

  it("submits the form and calls addNumber mutation for multiple numbers", async () => {
    renderWithProvider(<RegisterPage />);

    // Simulate user interaction
    const input = screen.getByLabelText("Multiple Numbers");
    const submitButton = screen.getByText("Add Numbers");

    await act(async () => {
      await userEvent.type(input, "12345, 67890, 11111");
      await userEvent.click(submitButton);
    });

    // Assert that the mutation was called for each number
    expect(addNumberMock).toHaveBeenCalledWith({ number: "12345" });
    expect(addNumberMock).toHaveBeenCalledWith({ number: "67890" });
    expect(addNumberMock).toHaveBeenCalledWith({ number: "11111" });
  });
});
