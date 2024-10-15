import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import CommentSection from "./CommentSection";

jest.mock("axios");

window.scrollTo = jest.fn();

describe("comment section", () => {
  const mockUser = {
    id: 6,
    name: "andrew salmon",
    email: "andrew.g.salmon@gmail.com",
    profile_img: "src/assets/logo/hitme-logo.png",
    location: "Toronto",
    fav_artists: "Thrice",
  };

  const mockArtistId = "0TOZ0i0BHZJYKK2rvoRD2d";

  it("renders", async () => {
    const mockComments = [
      {
        id: 84,
        name: "Fish",
        email: "andrew.g.salmon@gmail.com",
        comment: "Eyyyy still bangs",
        artistId: "0TOZ0i0BHZJYKK2rvoRD2d",
        created_at: "2024-09-17 11:40:45",
        updated_at: "2024-09-17 11:40:45",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockComments });

    render(<CommentSection user={mockUser} artistId={mockArtistId} />);
    const header = screen.getByText(/like the tunes/i);

    await waitFor(() => {
      expect(header).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/api/artists/comments/${mockArtistId}`)
    );
  });
});
