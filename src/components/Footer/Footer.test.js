import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";

test("footer renders", () => {
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: jest.fn(() => 'test-token'),
    },
    writable: true,
  });

  render(
    <MemoryRouter>
      <Footer />;
    </MemoryRouter>
  );

  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeInTheDocument();

  const findMusic = screen.getByText(/music/i);
  expect(findMusic).toBeInTheDocument();

  const profileLink = screen.getByText(/profile/i);
  expect(profileLink).toBeInTheDocument();

  const logOut = screen.getByText(/log out/i);
  expect(logOut).toBeInTheDocument();
});
