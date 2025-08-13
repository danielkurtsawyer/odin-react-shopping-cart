import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import Home from "./Home";

describe("Home", () => {
  it("should render to match snapshot", () => {
    const home = render(<Home />);
    expect(home).toMatchSnapshot();
  });
});
