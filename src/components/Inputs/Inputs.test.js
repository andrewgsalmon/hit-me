import { render, screen } from "@testing-library/react";
import Inputs from "./Inputs";

describe("inputs component", () => {
  const mockUser = {
    id: 6,
    name: "fish",
    email: "andrew.g.salmon@gmail.com",
    profile_img: "src/assets/logo/hitme-logo.png",
    location: "Toronto",
    fav_artists: "Thrice",
  };

  it("renders welcome message", () => {
    render(<Inputs user={mockUser} />);
    const welcomeNote = screen.getByText(/welcome/i);
    expect(welcomeNote).toBeInTheDocument();
  });

  it("renders welcome message with username", () => {
    render(<Inputs user={mockUser} />);
    const personalGreeting = screen.getByText(/welcome, fish/i);
    expect(personalGreeting).toBeInTheDocument();
  });
});