import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useOutletContext } from "react-router-dom";

import Shopping from "./Shopping";

vi.mock("react-router-dom", () => ({
  useOutletContext: vi.fn(),
}));

describe("Shopping", () => {
  beforeEach(() => {
    vi.mocked(useOutletContext).mockClear();
  });

  it("should render the heading correctly", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      loading: true,
      error: false,
      products: null,
    });
    render(<Shopping />);
    expect(screen.getByRole("heading").textContent).toMatch(
      /Shop Our Collection/i
    );
  });

  it("should render the loading message if loading is true", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      loading: true,
      error: false,
      products: null,
    });
    render(<Shopping />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render the error message if error is true", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      loading: false,
      error: true,
      products: null,
    });
    render(<Shopping />);
    expect(
      screen.getByText("Server Error... Try again later")
    ).toBeInTheDocument();
  });

  it("should not render either the loading or error message if both are false", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      loading: false,
      error: false,
      products: null,
    });

    render(<Shopping />);
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Server Error... Try again later")
    ).not.toBeInTheDocument();
  });
});
