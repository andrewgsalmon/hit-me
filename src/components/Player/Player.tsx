import React, { useState, useEffect } from "react";
import "./Player.scss";
import CommentSection from "../CommentSection/CommentSection";
import axios from "axios";
import OutputStandby from "../OutputStandby/OutputStandby";
const baseUrl = process.env.REACT_APP_BASE_URL;

interface InputsProps {
  recommended: any;
  handleSubmit: any;
  user: any;
  similarArtist: any;
  handleSimilar: any;
  artistId: string | null;
  setArtistId: any;
  similarLoading: boolean;
  genrePlainText: string | null;
}

function Player({
  recommended,
  handleSubmit,
  user,
  similarArtist,
  handleSimilar,
  artistId,
  setArtistId,
  similarLoading,
  genrePlainText,
}: InputsProps) {
  const [newLike, setNewLike] = useState<object | boolean>(false);

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (recommended) {
      try {
        const response = await axios.post(`${baseUrl}/api/users/likes`, {
          user_email: user.email,
          artist_name: recommended.artists[0].name,
          artist_id: recommended.artists[0].id,
          artist_img: recommended.album.images[0].url,
          artist_genre: genrePlainText
            ? genrePlainText.toLowerCase()
            : "unknown genre",
        });
        setNewLike(response);
      } catch (error) {
        console.error(error);
      }
    } else if (similarArtist) {
      try {
        const response = await axios.post(`${baseUrl}/api/users/likes`, {
          user_email: user.email,
          artist_name: similarArtist.name,
          artist_id: similarArtist.id,
          artist_img: similarArtist.images[0].url,
          artist_genre: similarArtist.genres[0],
        });
        setNewLike(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    await axios.delete(`${baseUrl}/api/users/likes`, {
      params: {
        user_email: user.email,
        artist_id: artistId,
      },
    });
    setNewLike(false);
  };

  useEffect(() => {
    if (similarArtist) {
      setArtistId(similarArtist.id);
    } else if (recommended) {
      setArtistId(recommended.artists[0].id);
    }
  }, [recommended, similarArtist, setArtistId]);

  useEffect(() => {
    if (handleSubmit || handleSimilar) {
      setNewLike(false);
    }
  }, [handleSubmit, handleSimilar]);

  return (
    <>
      <section id="music-section">
        <div id="spotify-player" className="spotify-player">
          {!artistId ? (
            <OutputStandby />
          ) : (
            <>
              <article className="spotify-player__player-controls">
                <div className="spotify-player__action spotify-player__action--shuffle">
                  <span>Like the tunes?</span>
                  <button
                    className={
                      similarLoading
                        ? "spotify-player__action-button spotify-player__action-button--loading"
                        : "spotify-player__action-button spotify-player__action-button--shuffle"
                    }
                    type="submit"
                    onClick={handleSimilar}
                  >
                    {similarLoading ? "" : "Get similar artist"}
                  </button>
                </div>
                <iframe
                  id="spotify-iframe"
                  title="spotify-iframe"
                  src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`}
                  width="100%"
                  height="152px"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
                <div className="spotify-player__action spotify-player__action--like">
                  {!newLike ? (
                    <button
                      className="spotify-player__action-button spotify-player__action-button--save"
                      type="submit"
                      onClick={handleSave}
                    >
                      Save this artist
                    </button>
                  ) : (
                    <button
                      className="spotify-player__action-button spotify-player__action-button--saved"
                      type="submit"
                      onClick={(e) => handleDelete(e, artistId)}
                    >
                      Artist saved!
                    </button>
                  )}
                </div>
              </article>
              <CommentSection user={user} artistId={artistId} />
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Player;
