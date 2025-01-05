import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NumbersPage from "../../features/numbers/NumbersPage";
import * as numbersApi from "../../features/numbers/api";

// Mock the API module
vi.mock("../api/numbersApi", () => ({
  useGetNumbersQuery: vi.fn(),
  useDeleteNumberMutation: vi.fn(),
}));

const theme = createTheme();

const mockNumbers = [
  {
    id: "1",
    number: "12345",
    prefix: "001",
    country: "USA",
    company: "Company A",
    description: "Test description A",
  },
  {
    id: "2",
    number: "67890",
    prefix: "002",
    country: "Canada",
    company: "Company B",
    description: "Test description B",
  },
];

// Use Vitest's `Mock` type
const useGetNumbersQueryMock = numbersApi.useGetNumbersQuery as Mock;
const useDeleteNumberMutationMock = numbersApi.useDeleteNumberMutation as Mock;

describe("NumbersPage Component", () => {
  beforeEach(() => {
    useGetNumbersQueryMock.mockReturnValue({
      data: mockNumbers,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    useDeleteNumberMutationMock.mockReturnValue([vi.fn()]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render numbers correctly in the table", () => {
    render(
      <ThemeProvider theme={theme}>
        <NumbersPage />
      </ThemeProvider>
    );

    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("67890")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Company A")).toBeInTheDocument();
    expect(screen.getByText("Company B")).toBeInTheDocument();
  });

  it("should filter numbers based on search input", async () => {
    render(
      <ThemeProvider theme={theme}>
        <NumbersPage />
      </ThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText("Search by number");
    fireEvent.change(searchInput, { target: { value: "123" } });

    await waitFor(() => {
      expect(screen.getByText("12345")).toBeInTheDocument();
      expect(screen.queryByText("67890")).not.toBeInTheDocument();
    });
  });

  it("should display a loading spinner while fetching numbers", () => {
    useGetNumbersQueryMock.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
  
    render(
      <ThemeProvider theme={theme}>
        <NumbersPage />
      </ThemeProvider>
    );
  
    // Check for the presence of the CircularProgress spinner
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  it("should display an error message when fetching numbers fails", () => {
    useGetNumbersQueryMock.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <ThemeProvider theme={theme}>
        <NumbersPage />
      </ThemeProvider>
    );

    expect(screen.getByText("something went wrong...")).toBeInTheDocument();
  });
  it("should open the filter modal, pick filters, and apply them", async () => {
    render(
      <ThemeProvider theme={theme}>
        <NumbersPage />
      </ThemeProvider>
    );

    // Open the filter modal
    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    // Wait for modal to appear
    expect(screen.getByText("Apply")).toBeInTheDocument();

    // Select prefix
    const prefixInput = screen.getByLabelText("Filter by Prefix");
    fireEvent.mouseDown(prefixInput); // Open the dropdown
    const prefixOption = screen.getByRole("option", { name: "001" });
    fireEvent.click(prefixOption); // Select an option

    // Select country
    const countryInput = screen.getByLabelText("Filter by Country");
    fireEvent.mouseDown(countryInput); // Open the dropdown
    const countryOption = screen.getByRole("option", { name: "USA" });
    fireEvent.click(countryOption); // Select an option

    // Apply filters
    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);

    // Wait for modal to close
    await waitFor(() => {
      expect(screen.queryByText("Apply")).not.toBeInTheDocument();
    });

    // Check filtered results
    await waitFor(() => {
      expect(screen.getByText("12345")).toBeInTheDocument();
      expect(screen.queryByText("67890")).not.toBeInTheDocument();
    });
  });

  it("should reset filters and display all numbers", async () => {
    render(
      <ThemeProvider theme={theme}>
        <NumbersPage />
      </ThemeProvider>
    );

    // Open the filter modal
    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    // Wait for modal to appear
    expect(screen.getByText("Apply")).toBeInTheDocument();

    // Select prefix
    const prefixInput = screen.getByLabelText("Filter by Prefix");
    fireEvent.mouseDown(prefixInput); // Open the dropdown
    const prefixOption = screen.getByRole("option", { name: "001" });
    fireEvent.click(prefixOption); // Select an option

    // Select country
    const countryInput = screen.getByLabelText("Filter by Country");
    fireEvent.mouseDown(countryInput); // Open the dropdown
    const countryOption = screen.getByRole("option", { name: "USA" });
    fireEvent.click(countryOption); // Select an option

    // Reset filters
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    // Check all numbers are displayed
    await waitFor(() => {
      expect(screen.getByText("12345")).toBeInTheDocument();
      expect(screen.getByText("67890")).toBeInTheDocument();
    });
  });

});
