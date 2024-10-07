import { render, screen, cleanup } from "@testing-library/react";
import LoginForm from "./LoginForm";

afterEach(() => {
  cleanup();
});

describe('login form', () => {
  it('loads the sign in heading', () => {
    render(<LoginForm />)

    const heading = screen.getByText(/sign in/i)
    expect(heading).toBeInTheDocument();
  })

  it("renders submit button with text: 'let me in'", () => {
    render(<LoginForm />)

    const buttonText = screen.getByText(/let me in/i)
    expect(buttonText).toBeInTheDocument();
  })

  it('loads OAuth buttons', () => {
    render(<LoginForm />)

    const googleText = screen.getByText(/google/i)
    expect(googleText).toBeInTheDocument();

    const spotifyText = screen.getByText(/spotify/i)
    expect(spotifyText).toBeInTheDocument();
  })
})

describe('password inputs', () => {
  it('is assigned type: password', () => {
    render(<LoginForm />);

    const password = screen.getByPlaceholderText('********');
    expect(password).toHaveAttribute('type', 'password')
  })
})