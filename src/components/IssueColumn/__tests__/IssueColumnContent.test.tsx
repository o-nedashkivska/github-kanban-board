import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../test-utils";

import IssueColumnContent from "../IssueColumnContent";

describe("IssueColumnContent", () => {
  describe("displays correct elements if status of column is loading", () => {
    const preloadedState = {
      issues: {
        status: { toDo: "loading", inProgress: "initial", done: "rejected" },
        limit: 0,
        allIssuesByRepo: {},
      },
    };

    test("displays spinner icon if status of column is loading", () => {
      renderWithProviders(
        <IssueColumnContent columnName="toDo" issues={[]} />,
        { preloadedState }
      );

      const spinner = screen.getByRole("img");

      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-label", "sync");
    });

    test("matches snapshot", () => {
      const { asFragment } = renderWithProviders(
        <IssueColumnContent columnName="toDo" issues={[]} />,
        { preloadedState }
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("displays correct elements if status of column is other than loading", () => {
    const issues = [
      {
        title: "Title 1",
        index: 0,
        number: 1011,
        comments: 11,
        created_at: new Date(),
      },
      {
        title: "Title 2",
        index: 1,
        number: 2022,
        comments: 22,
        created_at: new Date(),
      },
    ];

    test("displays correct text if issues array is empty", () => {
      const { asFragment } = renderWithProviders(
        <IssueColumnContent columnName="done" issues={[]} />
      );

      expect(screen.getByText("No issues")).toBeInTheDocument();

      expect(asFragment()).toMatchSnapshot();
    });

    test("displays correct issues", () => {
      const { asFragment } = renderWithProviders(
        <IssueColumnContent columnName="done" issues={issues} />
      );

      issues.forEach(({ title }) =>
        expect(screen.getByText(title)).toBeInTheDocument()
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
