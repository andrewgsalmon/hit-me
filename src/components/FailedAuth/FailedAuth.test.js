import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FailedAuth from "./FailedAuth";

afterEach(() => {
  cleanup();
});

describe('FailedAuth component', () => {
  it("should load 'oops' gif", () => {
    render(
      <MemoryRouter>
        <FailedAuth />
      </MemoryRouter>
    );

    const gif = screen.getByAltText(/giphy/i);
    expect(gif).toBeInTheDocument();
  });

  it("should load login link", () => {
    render(
      <MemoryRouter>
        <FailedAuth />
      </MemoryRouter>
    );

    const loginLink = screen.getByText(/log in/i)
    expect(loginLink).toBeInTheDocument();
  })
})

// test("garth gif loads", () => {
//   render(
//     <MemoryRouter>
//       <FailedAuth />
//     </MemoryRouter>
//   );

//   const gif = screen.getByAltText(/giphy/i);
//   expect(gif).toBeInTheDocument();
// });

// test('login link is present', () => {
//   render(
//     <MemoryRouter>
//       <FailedAuth />
//     </MemoryRouter>
//   );

//   const loginLink = screen.getByText(/log in/i)
//   expect(loginLink).toBeInTheDocument();
// })