import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

afterEach(() => {
  cleanup();
});

describe("hit me app", () => {
  it("renders successfully", () => {
    render(<App />);
  });

  it("renders welcome page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Welcome />
      </MemoryRouter>
    );

    const welcomeText = screen.getByText(/Welcome to/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it("renders login page", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Login />
      </MemoryRouter>
    );

    const loginText = screen.getByText(/sign in/i);
    expect(loginText).toBeInTheDocument();
  });

  it("renders registration page", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Register />
      </MemoryRouter>
    );

    const registerText = screen.getByText(/sign up for hit me/i);
    expect(registerText).toBeInTheDocument();
  });
});
