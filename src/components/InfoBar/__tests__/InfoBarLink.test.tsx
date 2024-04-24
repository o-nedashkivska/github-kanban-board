import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import InfoBarLink from "../InfoBarLink";

describe("InfoBarLink", () => {
  const text = "facebook";
  const href = "https://github.com/facebook";

  test("displays link with correct text and href", () => {
    render(<InfoBarLink text={text} href={href} />);

    expect(screen.getByText("Facebook")).toBeInTheDocument();

    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://github.com/facebook"
    );
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<InfoBarLink text={text} href={href} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
