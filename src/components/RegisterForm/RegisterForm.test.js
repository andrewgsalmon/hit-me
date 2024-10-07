import { screen, render } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

describe("registration form", () => {
  it("loads the login link", () => {
    render(<RegisterForm />);

    const loginLink = screen.getByText(/already signed up/i);
    expect(loginLink).toBeInTheDocument();
  });

  it("renders password fields with password type", () => {
    render(<RegisterForm />);

    const password = screen.getByLabelText("Password*");
    expect(password).toHaveAttribute("type", "password");

    const confirmPassword = screen.getByLabelText(/confirm password/i);
    expect(confirmPassword).toHaveAttribute("type", "password");
  });

  it("renders OAuth registration links", () => {
    render(<RegisterForm />);

    const spotifyButton = screen.getByText(/signup with spotify/i);
    expect(spotifyButton).toBeInTheDocument();

    const googleButton = screen.getByText(/signup with google/i);
    expect(googleButton).toBeInTheDocument();
  });
});
