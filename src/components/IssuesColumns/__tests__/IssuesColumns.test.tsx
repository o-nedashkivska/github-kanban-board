import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../test-utils";

import IssuesColumns from "../IssuesColumns";

describe("IssuesColumns", () => {
  test("displays three columns with correct names", () => {
    renderWithProviders(<IssuesColumns />);

    expect(screen.getByText("ToDo")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();

    expect(screen.getAllByText("No issues")).toHaveLength(3);
  });

  test("matches snapshot", () => {
    const { asFragment } = renderWithProviders(<IssuesColumns />);

    expect(asFragment()).toMatchSnapshot();
  });
});
