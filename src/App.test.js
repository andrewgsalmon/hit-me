import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

test("renders successfully", () => {
  render(<App />);
});

test("welcome page rendered", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Welcome />
    </MemoryRouter>
  );

  const welcomeText = screen.getByText(/Welcome to/i);
  expect(welcomeText).toBeInTheDocument();
});

test("Login page rendered", () => {
  render(
    <MemoryRouter initialEntries={["login"]}>
      <Login />
    </MemoryRouter>
  );

  const loginText = screen.getByText(/sign in/i);
  expect(loginText).toBeInTheDocument();
});

test("registration page rendered", () => {
  render(
    <MemoryRouter initialEntries={["register"]}>
      <Register />
    </MemoryRouter>
  );

  const registerText = screen.getByText(/sign up for hit me/i);
  expect(registerText).toBeInTheDocument();
});