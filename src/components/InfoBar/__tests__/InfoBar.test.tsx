import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../../test-utils";

import InfoBar from "../InfoBar";

describe("InfoBar", () => {
  describe("displays correct elements when status is fulfilled", () => {
    const owner = "Facebook";
    const repo = "React";

    const preloadedState = {
      currentRepo: {
        name: `${owner.toLowerCase()}/${repo.toLowerCase()}`,
        stars: 220,
        status: "fulfilled",
        statusReason: "",
      },
    };

    test("displays starIcon when status is fulfilled", () => {
      renderWithProviders(<InfoBar />, { preloadedState });

      const starIcon = screen.getByRole("img");

      expect(starIcon).toBeInTheDocument();
      expect(starIcon).toHaveAttribute("aria-label", "star");
    });

    test("displays stars number when status is fulfilled", () => {
      renderWithProviders(<InfoBar />, { preloadedState });

      expect(
        screen.getByText(`${preloadedState.currentRepo.stars} K stars`)
      ).toBeInTheDocument();
    });

    test("displays two links when status is fulfilled", () => {
      renderWithProviders(<InfoBar />, { preloadedState });

      expect(screen.getByText(owner)).toBeInTheDocument();
      expect(screen.getByText(">")).toBeInTheDocument();
      expect(screen.getByText(repo)).toBeInTheDocument();

      const listLinks = screen.getAllByRole("link");
      expect(listLinks.length).toBe(2);
    });

    test("matches snapshot", () => {
      const { asFragment } = renderWithProviders(<InfoBar />, {
        preloadedState,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("displays correct elements when status is other than fulfilled", () => {
    const preloadedState = {
      currentRepo: {
        name: "facebook/react",
        stars: 0,
        status: "rejected",
        statusReason: "Something went wrong.",
      },
    };

    test("displays status icon when status is other than fulfilled", () => {
      renderWithProviders(<InfoBar />, { preloadedState });

      const statusIcon = screen.getByRole("img");

      expect(statusIcon).toBeInTheDocument();
    });

    test("displays status reason when status is other than fulfilled", () => {
      renderWithProviders(<InfoBar />, { preloadedState });

      expect(
        screen.getByText(preloadedState.currentRepo.statusReason)
      ).toBeInTheDocument();
    });

    test("matches snapshot", () => {
      const { asFragment } = renderWithProviders(<InfoBar />, {
        preloadedState,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
