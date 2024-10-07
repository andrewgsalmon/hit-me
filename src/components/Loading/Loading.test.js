import { screen, render } from "@testing-library/react";
import Loading from "./Loading";

describe('loading gif component', () => {
  it('loads the gif', () => {
    render(<Loading />)

    const loadingGif = screen.getByAltText(/loading spinner/i);
    expect(loadingGif).toBeInTheDocument();
    expect(loadingGif).toHaveAttribute('src', 'infinite-spinner.svg')
  });

  it('loads the text', () => {
    render(<Loading />)

    const loadingText = screen.getByText(/loading/i)
    expect(loadingText).toBeInTheDocument();
  })
})