import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../test-utils";

import IssueCard from "../IssueCard";

describe("IssueCard", () => {
  const issues = [
    {
      title: "Title 2",
      index: 1,
      number: 2022,
      comments: 22,
      assignee: { login: "username" },
      created_at: new Date(),
    },
    {
      title: "Title 1",
      index: 0,
      number: 1011,
      comments: 11,
      assignee: null,
      created_at: new Date(),
    },
  ];

  test("displays correct card", () => {
    const cardData = issues[0];
    renderWithProviders(<IssueCard {...cardData} />);

    expect(screen.getByText(cardData.title)).toBeInTheDocument();

    expect(
      screen.getByText(`#${cardData.number} opened today`)
    ).toBeInTheDocument();

    const commentsText = `Comments: ${cardData.comments}`;
    const loginText = cardData.assignee.login;

    expect(
      screen.getByText(`${loginText} | ${commentsText}`)
    ).toBeInTheDocument();
  });

  test("displays correct text when assignee is null", () => {
    const cardData = issues[1];
    renderWithProviders(<IssueCard {...cardData} />);

    const commentsText = `Comments: ${cardData.comments}`;
    expect(
      screen.getByText(`No assignee | ${commentsText}`)
    ).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = renderWithProviders(<IssueCard {...issues[0]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
