import { screen, fireEvent } from "@testing-library/react";

import { renderWithProviders } from "../../../test-utils";

import SearchLimit, { limitOptions } from "../SearchLimit";

const defaultOptionLabel = limitOptions[0].label;

describe("SearchLimit", () => {
  test("displays correct default option", () => {
    renderWithProviders(<SearchLimit />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText(defaultOptionLabel)).toBeInTheDocument();
  });

  describe("displays correct limit when status is loading", () => {
    const preloadedState = {
      currentRepo: { name: "", stars: 0, status: "loading", statusReason: "" },
      issues: {
        status: { toDo: "initial", inProgress: "loading", done: "loading" },
        limit: 0,
        allIssuesByRepo: {},
      },
    };

    test("limit selection is disabled when status is loading", () => {
      renderWithProviders(<SearchLimit />, {
        preloadedState,
      });

      const select = screen.getByRole("combobox");

      expect(select).toBeInTheDocument();
      expect(select).toBeDisabled();
    });

    test("matches snapshot", () => {
      const { asFragment } = renderWithProviders(<SearchLimit />, {
        preloadedState,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("displays correct limit when status is other than loading", () => {
    test("limit selection is enabled when status is other than loading", () => {
      renderWithProviders(<SearchLimit />);

      const select = screen.getByRole("combobox");

      expect(select).toBeInTheDocument();
      expect(select).toBeEnabled();
    });

    test("displays correct label on select change", () => {
      renderWithProviders(<SearchLimit />);

      const select = screen.getByRole("combobox");

      expect(select).toBeInTheDocument();

      const { value: newValue, label: newLabel } = limitOptions[1];
      fireEvent.input(select, { target: { value: newValue, bubbles: true } });

      expect(screen.getByText(newLabel)).toBeInTheDocument();
    });

    test("matches snapshot", () => {
      const { asFragment } = renderWithProviders(<SearchLimit />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
