import { screen, render } from "@testing-library/react";
import Player from "./Player";

test('britney gif loads on mount', () => {
  render(<Player />)

  const britneyGif = screen.getByAltText(/britney spears/i)
  expect(britneyGif).toBeInTheDocument();
})