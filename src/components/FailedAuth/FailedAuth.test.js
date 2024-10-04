import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FailedAuth from "./FailedAuth";

test("garth gif loads", () => {
  render(
    <MemoryRouter>
      <FailedAuth />
    </MemoryRouter>
  );

  const gif = screen.getByAltText(/giphy/i);
  expect(gif).toBeInTheDocument();
});

test('login link is present', () => {
  render(
    <MemoryRouter>
      <FailedAuth />
    </MemoryRouter>
  );

  const loginLink = screen.getByText(/log in/i)
  expect(loginLink).toBeInTheDocument();
})