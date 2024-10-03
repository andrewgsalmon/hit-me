import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FailedAuth from "./FailedAuth";

test("garth gif loads", () => {
  render(
    <MemoryRouter>
      <FailedAuth />
    </MemoryRouter>
  );

  const garthGif = screen.getByAltText(/gif of garth/i);
  expect(garthGif).toBeInTheDocument();
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