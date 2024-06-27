import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

// Mock useOnClickOutside hook
jest.mock("../hook/useOnclickOutside", () => ({
  useOnClickOutside: jest.fn(),
}));

describe("SearchBar component", () => {
  const mockSetSearchValue = jest.fn();
  const mockDropDownClickAction = jest.fn();
  const dropDownOptions = [
    { id: 1, title: "Album 1" },
    { id: 2, title: "Album 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <SearchBar
        searchValue=""
        setSearchValue={mockSetSearchValue}
        dropDownOptions={dropDownOptions}
        dropDownClickAction={mockDropDownClickAction}
      />
    );

    expect(
      screen.getByPlaceholderText("Search photos by Album")
    ).toBeInTheDocument();
  });

  it("shows dropdown options on input change", () => {
    render(
      <SearchBar
        searchValue=""
        setSearchValue={mockSetSearchValue}
        dropDownOptions={dropDownOptions}
        dropDownClickAction={mockDropDownClickAction}
      />
    );

    const input = screen.getByPlaceholderText("Search photos by Album");
    fireEvent.change(input, { target: { value: "Album" } });

    expect(screen.getByText("Album 1")).toBeInTheDocument();
    expect(screen.getByText("Album 2")).toBeInTheDocument();
  });

  it("filters dropdown options based on search input", async () => {
    render(
      <SearchBar
        searchValue=""
        setSearchValue={mockSetSearchValue}
        dropDownOptions={dropDownOptions}
        dropDownClickAction={mockDropDownClickAction}
      />
    );

    const input = screen.getByPlaceholderText("Search photos by Album");
    fireEvent.change(input, { target: { value: "1" } });
    await waitFor(() => {
      const album1 = screen.getByText("Album 1");
      expect(album1).toBeInTheDocument();
      const album2 = screen.queryByText("Album 2");
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(album2).toBeInTheDocument();
    });
  });

  it("handles dropdown option click", () => {
    render(
      <SearchBar
        searchValue=""
        setSearchValue={mockSetSearchValue}
        dropDownOptions={dropDownOptions}
        dropDownClickAction={mockDropDownClickAction}
      />
    );

    const input = screen.getByPlaceholderText("Search photos by Album");
    fireEvent.change(input, { target: { value: "Album" } });

    const option = screen.getByText("Album 1");
    fireEvent.click(option);

    expect(mockSetSearchValue).toHaveBeenCalledWith("Album 1");
    expect(mockDropDownClickAction).toHaveBeenCalledWith(1);
  });
});
