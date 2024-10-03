import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

test('Sign in header loads', () => {
  render(<LoginForm />)

  const header = screen.getByText(/sign in/i)
  expect(header).toBeInTheDocument();
})

test('password field is assigned type: password', () => {
  render(<LoginForm />);

  const password = screen.getByPlaceholderText('********');
  expect(password).toHaveAttribute('type', 'password')
})

test(`submit button loads with text saying "let me in"`, () => {
  render(<LoginForm />)

  const buttonText = screen.getByText(/let me in/i)
  expect(buttonText).toBeInTheDocument();
})

test('OAuth buttons load', () => {
  render(<LoginForm />)

  const googleText = screen.getByText(/google/i)
  expect(googleText).toBeInTheDocument();

  const spotifyText = screen.getByText(/spotify/i)
  expect(spotifyText).toBeInTheDocument();
})