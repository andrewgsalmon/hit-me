import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Comment from "./Comment";

const mockArtistComment = {
  comment: "This is a test comment",
  name: "Fish",
  created_at: "2024-10-02T12:34:56Z",
  email: "andrew.g.salmon@gmail.com",
};

jest.mock("axios");

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

describe("comment component", () => {
  it("renders component with name", async () => {
    render(<Comment artistComment={mockArtistComment} />);

    await waitFor(() => {
      expect(screen.getByText(/fish/i)).toBeInTheDocument();
    });
  });

  it("renders component with comment text", async () => {
    render(<Comment artistComment={mockArtistComment} />);

    await waitFor(() => {
      expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    });
  });

  it('renders with profile pic', async () => {
    render(<Comment artistComment={mockArtistComment} />)

    await waitFor(() => {
      expect(screen.getByAltText(/fish/i)).toBeInTheDocument();
    })
  })
});
