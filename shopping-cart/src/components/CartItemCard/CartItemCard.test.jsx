import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartItemCard from "./CartItemCard";

describe("CardItemCard", () => {
  it("should render a cart item card with the correct product information and given quantity", () => {
    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(<CartItemCard product={product} numItem={10} />);

    const title = screen.getByText("Test Title");
    expect(title).toBeInTheDocument();

    const price = screen.getByText("$100.00");
    expect(price).toBeInTheDocument();

    const input = screen.getByRole("spinbutton", { value: { now: 10 } });
    expect(input).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Remove From Cart" });
    expect(button).toBeInTheDocument();
  });

  it("should call the RemoveFromCart function when clicked", async () => {
    const removeFromCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard
        product={product}
        numItem={10}
        removeFromCart={removeFromCart}
      />
    );

    const button = screen.getByRole("button", { name: "Remove From Cart" });
    await user.click(button);
    expect(removeFromCart).toHaveBeenCalled();
  });

  it("should not call the RemoveFromCart function when it isn't clicked", () => {
    const removeFromCart = vi.fn();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard
        product={product}
        numItem={10}
        removeFromCart={removeFromCart}
      />
    );

    expect(removeFromCart).not.toHaveBeenCalled();
  });

  it("should increment quantity when the + img is clicked", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={10} updateCart={updateCart} />
    );

    const incrementImg = screen.getByAltText("+");

    const input = screen.getByRole("spinbutton", { value: { now: 10 } });
    expect(input).toBeInTheDocument();

    await user.click(incrementImg);
    expect(input.value).toEqual("11");
  });

  it("should decrement quantity when the - img is clicked", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={10} updateCart={updateCart} />
    );

    const decrementImg = screen.getByAltText("-");

    const input = screen.getByRole("spinbutton", { value: { now: 10 } });
    expect(input).toBeInTheDocument();

    await user.click(decrementImg);
    expect(input.value).toEqual("9");
  });

  it("should not decrement quantity when the - img is clicked and the quantity is 1", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={2} updateCart={updateCart} />
    );

    const decrementImg = screen.getByAltText("-");

    const input = screen.getByRole("spinbutton", { value: { now: 2 } });
    expect(input).toBeInTheDocument();

    await user.click(decrementImg);
    expect(input.value).toEqual("1");

    await user.click(decrementImg);
    expect(input.value).toEqual("1");
  });

  it("should update number input value if input is greater than 0", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={2} updateCart={updateCart} />
    );

    const input = screen.getByRole("spinbutton", { value: { now: 2 } });
    expect(input).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "5");
    expect(input.value).toEqual("5");
  });

  it("should not accept negative number input values, reverting back to 1", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={2} updateCart={updateCart} />
    );

    const input = screen.getByRole("spinbutton", { value: { now: 2 } });
    expect(input).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "-1");
    expect(input.value).toEqual("1");

    await user.clear(input);
    await user.type(input, "-8");
    expect(input.value).toEqual("1");
  });

  it("should call updateCart with new quantity value if quantity is changed using increment img", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={2} updateCart={updateCart} />
    );

    const incrementImg = screen.getByAltText("+");

    await user.click(incrementImg);
    expect(updateCart).toHaveBeenCalled();
    expect(updateCart.mock.lastCall).toEqual([1, 3]);
  });

  it("should call updateCart with new quantity value if quantity is changed using decrement img", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={2} updateCart={updateCart} />
    );
    const decrementImg = screen.getByAltText("-");

    await user.click(decrementImg);
    expect(updateCart).toHaveBeenCalled();
    expect(updateCart.mock.lastCall).toEqual([1, 1]);
  });

  it("should call updateCart with new quantity value if quantity is changed using number input", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={2} updateCart={updateCart} />
    );

    const input = screen.getByRole("spinbutton", { value: { now: 2 } });

    await user.clear(input);
    await user.type(input, "8");
    expect(updateCart).toHaveBeenCalled();
    expect(updateCart.mock.lastCall).toEqual([1, 8]);
  });

  it("should not call updateCart if decrement img is clicked when quantity is 1", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={1} updateCart={updateCart} />
    );
    const decrementImg = screen.getByAltText("-");

    await user.click(decrementImg);
    expect(updateCart).not.toHaveBeenCalled();
  });

  it("should call updateCart with quantity=1 if negative value is typed in number input", async () => {
    const updateCart = vi.fn();
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Title",
      description: "test description",
      price: 100,
      image: "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png",
    };
    render(
      <CartItemCard product={product} numItem={2} updateCart={updateCart} />
    );

    const input = screen.getByRole("spinbutton", { value: { now: 2 } });

    await user.clear(input);
    await user.type(input, "-8");

    expect(updateCart).toHaveBeenCalled();
    expect(updateCart.mock.lastCall).toEqual([1, 1]);
  });
});
