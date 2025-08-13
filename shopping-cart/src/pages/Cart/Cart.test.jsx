import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useOutletContext } from "react-router-dom";

import Cart from "./Cart";

vi.mock("react-router-dom", () => ({
  useOutletContext: vi.fn(),
}));

describe("Cart", () => {
  beforeEach(() => {
    vi.mocked(useOutletContext).mockClear();
  });

  it("should show correct heading", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [],
      products: null,
    });
    render(<Cart />);
    expect(
      screen.getByRole("heading", { name: "Your Cart" })
    ).toBeInTheDocument();
  });

  it("should show nothing's here message when cart is empty", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [],
      products: null,
    });
    render(<Cart />);
    expect(
      screen.getByText("Nothing's here. Shop to add items to your cart.")
    ).toBeInTheDocument();
  });

  it("should not show total price if cart is empty", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [],
      products: null,
    });
    render(<Cart />);
    expect(
      screen.queryByRole("heading", { name: "Total" })
    ).not.toBeInTheDocument();
  });

  it("should show the total heading when cart has items along with the price", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [
        {
          id: 1,
          quantity: 2,
        },
      ],
      products: [
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
      ],
    });

    render(<Cart />);
    expect(screen.getByRole("heading", { name: "Total" })).toBeInTheDocument();
    expect(screen.getByText("$219.90")).toBeInTheDocument();
  });

  it("should create the correct number of CartItemCards", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [
        {
          id: 1,
          quantity: 1,
        },
      ],
      products: [
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
      ],
    });

    const { rerender } = render(<Cart />);
    expect(screen.getByTestId("cart-container").children.length).toBe(3);

    vi.mocked(useOutletContext).mockReturnValue({
      cart: [
        {
          id: 1,
          quantity: 1,
        },
        {
          id: 2,
          quantity: 1,
        },
        {
          id: 3,
          quantity: 1,
        },
      ],
      products: [
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
        {
          id: 3,
          title: "Mens Cotton Jacket",
          price: 55.99,
          description:
            "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
          rating: {
            rate: 4.7,
            count: 500,
          },
        },
      ],
    });

    rerender(<Cart />);
    expect(screen.getByTestId("cart-container").children.length).toBe(5);
  });

  it("should display the correct total price for multiple different products", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [
        {
          id: 1,
          quantity: 1,
        },
        {
          id: 2,
          quantity: 1,
        },
        {
          id: 3,
          quantity: 1,
        },
      ],
      products: [
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
        {
          id: 3,
          title: "Mens Cotton Jacket",
          price: 55.99,
          description:
            "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
          rating: {
            rate: 4.7,
            count: 500,
          },
        },
      ],
    });

    render(<Cart />);
    expect(screen.getByText(`$${109.95 + 22.3 + 55.99}`)).toBeInTheDocument();
  });
});
