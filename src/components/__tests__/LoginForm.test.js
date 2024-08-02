import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import LoginForm from "../LoginForm/LoginForm";
import "@testing-library/jest-dom/extend-expect";
const { USERNAME, PASSWORD } = process.env;

afterEach(() => {
  cleanup();
});

test("login successful", async () => {
  render(<LoginForm />);

  const emailInput = screen.getByPlaceholderText("ringo@beatles.co.uk");
  fireEvent.change(emailInput, { target: { value: USERNAME } });

  const pwInput = screen.getByPlaceholderText("********");
  fireEvent.change(pwInput, { target: { value: PASSWORD } });

  const button = screen.getByText("LET ME IN");
  fireEvent.click(button);

  await waitFor(() => {
    expect(window.location).toBe('/home');
  });
});
