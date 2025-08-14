import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  beforeEach,
} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import routes from "./routes.jsx";

// declare memory router
let router = null;

// set up msw server to intercept fetch requests
const server = setupServer(
  http.get("https://fakestoreapi.com/products", () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        rating: {
          rate: 3.9,
          count: 120,
        },
      },
      {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        category: "men's clothing",
        image:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
        rating: {
          rate: 4.1,
          count: 259,
        },
      },
    ]);
  })
);

beforeAll(() => server.listen());
beforeEach(() => {
  // configure browser router
  router = createMemoryRouter(routes, {
    initialEntries: ["/shop"],
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App", () => {
  it("should move the correct product to the cart while showing the correct number of cart items in the nav bar", async () => {
    const user = userEvent.setup();
    // check if App components renders headline
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading").textContent).toMatch(
      /Shop Our Collection/i
    );

    const itemTitle = await screen.findByText(
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    );

    expect(itemTitle).toBeInTheDocument();

    const button = screen.getAllByRole("button", { name: "Add to Cart" })[0];
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(screen.queryByText("(0)")).not.toBeInTheDocument();
    expect(screen.getByText("(1)")).toBeInTheDocument();

    await user.click(button);

    expect(screen.queryByText("(1)")).not.toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();

    const cart = screen.getByAltText("Cart");
    await user.click(cart);

    expect(
      screen.getByRole("heading", { name: "Your Cart" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    ).toBeInTheDocument();

    expect(screen.getByRole("spinbutton")).toHaveValue(2);
  });

  it("should remove the correct products from the cart and display empty cart message when empty", async () => {
    const user = userEvent.setup();
    // check if App components renders headline
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading").textContent).toMatch(
      /Shop Our Collection/i
    );

    const itemTitle = await screen.findByText(
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    );

    expect(itemTitle).toBeInTheDocument();

    const addButtons = screen.getAllByRole("button", { name: "Add to Cart" });
    expect(addButtons[0]).toBeInTheDocument();

    await user.click(addButtons[0]);
    await user.click(addButtons[1]);

    const cart = screen.getByAltText("Cart");
    await user.click(cart);

    const removeButtons = screen.getAllByRole("button", {
      name: "Remove From Cart",
    });
    expect(removeButtons[0]).toBeInTheDocument();

    await user.click(removeButtons[0]);

    expect(screen.queryByText("(2)")).not.toBeInTheDocument();
    expect(screen.getByText("(1)")).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Mens Casual Premium Slim Fit T-Shirts")
    ).toBeInTheDocument();

    await user.click(removeButtons[1]);
    expect(
      screen.getByText("Nothing's here. Shop to add items to your cart.")
    ).toBeInTheDocument();

    expect(screen.queryByText("(1)")).not.toBeInTheDocument();
    expect(screen.getByText("(0)")).toBeInTheDocument();
  });
});
