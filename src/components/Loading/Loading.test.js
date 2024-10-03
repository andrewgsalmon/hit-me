import { screen, render } from "@testing-library/react";
import Loading from "./Loading";

test('loading gif loads', () => {
  render(<Loading />)

  const loadingGif = screen.getByAltText(/loading spinner/i);
  expect(loadingGif).toBeInTheDocument();
  expect(loadingGif).toHaveAttribute('src', 'infinite-spinner.svg')
});

test('loading text loads', () => {
  render(<Loading />)

  const loadingText = screen.getByText(/loading/i)
  expect(loadingText).toBeInTheDocument();
})