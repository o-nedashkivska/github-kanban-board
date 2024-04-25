import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../../test-utils";

import SearchBar from "../SearchBar";

jest.mock("../../../hooks/useInput", () => ({
  __esModule: true,
  default: () => ({
    value: "https://github.com/facebook/react",
    error: false,
    isValid: true,
    isTouched: false,
    onChange: () => {},
    onBlur: () => {},
  }),
}));

describe("SearchBar", () => {
  test("displays search, select and button", async () => {
    renderWithProviders(<SearchBar />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter repo URL");

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  test("starts loading data on button click", async () => {
    const { store } = renderWithProviders(<SearchBar />);

    expect(store.getState().currentRepo.status).toBe("initial");

    const button = screen.getByRole("button");

    await fireEvent.click(button);

    expect(store.getState().currentRepo.status).toBe("loading");
  });

  test("matches snapshot", () => {
    const { asFragment } = renderWithProviders(<SearchBar />);

    expect(asFragment()).toMatchSnapshot();
  });
});
