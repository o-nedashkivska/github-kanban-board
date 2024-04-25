import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../test-utils";

import InfoBarStatus from "../InfoBarStatus";

describe("InfoBarStatus", () => {
  const preloadedState = {
    currentRepo: {
      name: "facebook/react",
      stars: 0,
      status: "rejected",
      statusReason: "Something went wrong.",
    },
  };

  test("displays status icon", () => {
    renderWithProviders(<InfoBarStatus />, { preloadedState });

    const statusIcon = screen.getByRole("img");

    expect(statusIcon).toBeInTheDocument();
  });

  test("displays correct status reason", () => {
    renderWithProviders(<InfoBarStatus />, { preloadedState });

    expect(
      screen.getByText(preloadedState.currentRepo.statusReason)
    ).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = renderWithProviders(<InfoBarStatus />, {
      preloadedState,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
