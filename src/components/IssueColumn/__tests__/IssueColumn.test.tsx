import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../test-utils";

import IssueColumn from "../IssueColumn";

describe("IssueColumn", () => {
  test("displays correct title", () => {
    const { asFragment } = renderWithProviders(
      <IssueColumn title="ToDo" columnName="toDo" issues={[]} />
    );

    expect(screen.getByText("ToDo")).toBeInTheDocument();
    expect(screen.getByText("No issues")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  test("passes issues to child component", () => {
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

    const { asFragment } = renderWithProviders(
      <IssueColumn title="ToDo" columnName="toDo" issues={issues} />
    );

    expect(screen.getByText("ToDo")).toBeInTheDocument();

    issues.forEach(({ title }) =>
      expect(screen.getByText(title)).toBeInTheDocument()
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
