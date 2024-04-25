import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../../test-utils";

import SearchButton from "../SearchButton";

describe("SearchButton", () => {
  const onClick = jest.fn();

  test("displays correct button text", () => {
    renderWithProviders(<SearchButton disabled={false} onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    expect(screen.getByText("Load Issues")).toBeInTheDocument();
  });

  describe("displays correct button when status is loading", () => {
    const preloadedState = {
      currentRepo: { name: "", stars: 0, status: "loading", statusReason: "" },
      issues: {
        status: { toDo: "initial", inProgress: "loading", done: "loading" },
        limit: 0,
        allIssuesByRepo: {},
      },
    };

    test("button is disabled when status is loading and disabled prop is false", () => {
      renderWithProviders(<SearchButton disabled={false} onClick={onClick} />, {
        preloadedState,
      });

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();

      userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    test("button is disabled when status is loading and disabled prop is true", () => {
      renderWithProviders(<SearchButton disabled={true} onClick={onClick} />, {
        preloadedState,
      });

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();

      userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    test("matches snapshot", () => {
      const { asFragment } = renderWithProviders(
        <SearchButton disabled={false} onClick={onClick} />,
        {
          preloadedState,
        }
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("displays correct button when status is other than loading", () => {
    test("button is disabled when status is other than loading and disabled prop is true", () => {
      renderWithProviders(<SearchButton disabled={true} onClick={onClick} />);

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();

      userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    test("button is enabled when status is other than loading and disabled prop is false", () => {
      renderWithProviders(<SearchButton disabled={false} onClick={onClick} />);

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();

      userEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test("matches snapshot", () => {
      const { asFragment } = renderWithProviders(
        <SearchButton disabled={true} onClick={onClick} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
