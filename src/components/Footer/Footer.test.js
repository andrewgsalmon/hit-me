import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";

afterEach(() => {
  cleanup();
});

describe("footer element", () => {
  afterEach(() => {
    cleanup();
  })

  it("renders", () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => "test-token"),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Footer />;
      </MemoryRouter>
    );

    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  it("loads the music link", () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => "test-token"),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Footer />;
      </MemoryRouter>
    );

    const findMusic = screen.getByText(/music/i);
    expect(findMusic).toBeInTheDocument();
  });

  it("loads the profile link", () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => "test-token"),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Footer />;
      </MemoryRouter>
    );

    const profileLink = screen.getByText(/profile/i);
    expect(profileLink).toBeInTheDocument();
  });

  it("loads the log out link", () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => "test-token"),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Footer />;
      </MemoryRouter>
    );

    const logOutLink = screen.getByText(/log out/i);
    expect(logOutLink).toBeInTheDocument();
  });
});
