import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("header", () => {
  it("renders the logo", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const headerLogo = screen.getByAltText(/hit me logo/i);
    expect(headerLogo).toBeInTheDocument();
  });
});

cleanup();
