import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import ProfileInfo from "./ProfileInfo";

jest.mock("../SavedArtistList/SavedArtistList", () => () => (
  <div data-testid="mocked-component"></div>
));

jest.mock("axios");

describe("ProfileInfo", () => {
  beforeEach(() => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => "fake-token"),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with user data present", async () => {
    const mockUserData = {
      id: 1,
      name: "Fish",
      email: "andrew.g.salmon@gmail.com",
      profile_img: "/src/assets/logo/hitme-logo.png",
      location: "Toronto",
      fav_artists: "Thrice",
    };

    axios.get.mockResolvedValueOnce({ data: mockUserData });

    render(<ProfileInfo />);

    const userNameElement = await screen.findByText(/fish/i);
    expect(userNameElement).toBeInTheDocument();

    const emailElement = await screen.findByText(/andrew.g.salmon/i);
    expect(emailElement).toBeInTheDocument();

    const locationElement = await screen.findByText(/toronto/i);
    expect(locationElement).toBeInTheDocument();

    const favArtistsElement = await screen.findByText(/thrice/i);
    expect(favArtistsElement).toBeInTheDocument();

    const uploadButton = screen.getByLabelText(/upload an avatar/i);
    expect(uploadButton).toBeInTheDocument();
  });
});