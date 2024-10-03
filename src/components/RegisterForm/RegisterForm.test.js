import { screen, render } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

test('login link appears', () => {
  render(<RegisterForm/>)

  const loginLink = screen.getByText(/already signed up/i)
  expect(loginLink).toBeInTheDocument();
});

test('password fields are set to password type', () => {
  render(<RegisterForm/>)

  const password = screen.getByLabelText('Password*');
  expect(password).toHaveAttribute('type', 'password')

  const confirmPassword = screen.getByLabelText(/confirm password/i);
  expect(confirmPassword).toHaveAttribute('type', 'password')
})

test('OAuth registration links mount', () => {
  render(<RegisterForm/>)

  const spotifyButton = screen.getByText(/signup with spotify/i)
  expect(spotifyButton).toBeInTheDocument();

  const googleButton = screen.getByText(/signup with google/i)
  expect(googleButton).toBeInTheDocument();
})