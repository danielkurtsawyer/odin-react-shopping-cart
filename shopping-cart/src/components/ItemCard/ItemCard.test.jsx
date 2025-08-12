import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemCard from "./ItemCard";

describe("ItemCard", () => {
  it("should render an item card with the correct product information and starting quantity of one", () => {
    render(
      <ItemCard
        id={1}
        title="Test Title"
        price={49.99}
        image="https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
      />
    );

    const image = screen.getByAltText("Test Title");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
    );

    const title = screen.getByText("Test Title");
    expect(title).toBeInTheDocument();

    const price = screen.getByText("$49.99");
    expect(price).toBeInTheDocument();

    const input = screen.getByRole("spinbutton", { value: { now: 1 } });
    expect(input).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Add to Cart" });
    expect(button).toBeInTheDocument();
  });

  it("should call the onClick function when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ItemCard
        id={1}
        title="Test Title"
        price={49.99}
        image="https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
        addToCart={onClick}
      />
    );

    const button = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("should not call the onClick function when it isn't clicked", async () => {
    const onClick = vi.fn();
    render(
      <ItemCard
        id={1}
        title="Test Title"
        price={49.99}
        image="https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
        addToCart={onClick}
      />
    );

    expect(onClick).not.toHaveBeenCalled();
  });

  it("should increment quantity when the + img is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ItemCard
        id={1}
        title="Test Title"
        price={49.99}
        image="https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
      />
    );

    const incrementImg = screen.getByAltText("+");

    const input = screen.getByRole("spinbutton", { value: { now: 1 } });
    expect(input).toBeInTheDocument();

    await user.click(incrementImg);
    expect(input.ariaValueNow).toEqual("2");
  });

  it("should decrement quantity when the - img is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ItemCard
        id={1}
        title="Test Title"
        price={49.99}
        image="https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
        initialQuantity={2}
      />
    );

    const decrementImg = screen.getByAltText("-");

    const input = screen.getByRole("spinbutton", { value: { now: 2 } });
    expect(input).toBeInTheDocument();

    await user.click(decrementImg);
    expect(input.ariaValueNow).toEqual("1");
  });

  it("should not decrement quantity when the - img is clicked if quantity is 1", async () => {
    const user = userEvent.setup();
    render(
      <ItemCard
        id={1}
        title="Test Title"
        price={49.99}
        image="https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
      />
    );

    const decrementImg = screen.getByAltText("-");

    const input = screen.getByRole("spinbutton", { value: { now: 1 } });
    expect(input).toBeInTheDocument();

    await user.click(decrementImg);
    expect(input.value).toEqual("1");
  });

  it("should update the number input value if greater than 0", async () => {
    const user = userEvent.setup();
    render(
      <ItemCard
        id={1}
        title="Test Title"
        price={49.99}
        image="https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
      />
    );
    const input = screen.getByRole("spinbutton", { value: { now: 1 } });
    expect(input).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "5");
    expect(input.value).toEqual("5");
  });

  it("should not accept negative number input values", async () => {
    const user = userEvent.setup();
    render(
      <ItemCard
        id={1}
        title="Test Title"
        price={49.99}
        image="https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
      />
    );
    const input = screen.getByRole("spinbutton", { value: { now: 1 } });
    expect(input).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "-1");
    expect(input.value).toBe("1");
  });
  it("negative input values should revert to 1", async () => {
    const user = userEvent.setup();
    render(
      <ItemCard
        id={1}
        title="Test Title"
        price={49.99}
        image="https://www.wildblueyondermusic.com/assets/logo-B4oS1OYH.png"
      />
    );
    const input = screen.getByRole("spinbutton", { value: { now: 1 } });
    expect(input).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "-9");
    expect(input.value).toBe("1");
  });
});
