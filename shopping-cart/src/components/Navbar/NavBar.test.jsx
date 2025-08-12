import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";

describe("NavBar", () => {
  it("should display the nav bar with the correct information", () => {
    render(
      <BrowserRouter>
        <NavBar itemsInCart={0} />
      </BrowserRouter>
    );

    expect(screen.getByAltText("ShoppingCentral Logo")).toBeInTheDocument();
    expect(screen.getByText("ShoppingCentral")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByAltText("Cart")).toBeInTheDocument();
    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  it("should display the num items next to cart", () => {
    render(
      <BrowserRouter>
        <NavBar itemsInCart={100} />
      </BrowserRouter>
    );

    expect(screen.getByText("(100)")).toBeInTheDocument();
  });
});
