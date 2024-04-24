import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import StatusIcon from "../StatusIcon";

describe("StatusIcon", () => {
  test("displays correct icon for initial status", () => {
    render(<StatusIcon status="initial" />);

    const icon = screen.getByRole("img");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "bulb");
  });

  test("displays correct icon for rejected status", () => {
    render(<StatusIcon status="rejected" />);

    const icon = screen.getByRole("img");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "warning");
  });

  test("displays correct icon for loading status", () => {
    render(<StatusIcon status="loading" />);

    const icon = screen.getByRole("img");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "loading");
  });

  test("displays correct icon when no status was passed", () => {
    render(<StatusIcon />);

    const icon = screen.getByRole("img");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "bulb");
  });

  test("displays correct icon when incorrect status was passed", () => {
    render(<StatusIcon status="nonexistent status" />);

    const icon = screen.getByRole("img");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "bulb");
  });

  test("passes all additional props", () => {
    render(<StatusIcon data-prop="some other prop" />);

    const icon = screen.getByRole("img");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-prop", "some other prop");
  });

  test("matches snapshot", async () => {
    const { asFragment } = render(<StatusIcon />);

    expect(asFragment()).toMatchSnapshot();
  });
});
