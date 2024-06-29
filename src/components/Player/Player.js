import React, { useState, useEffect } from "react";
import "./Player.scss";
import CommentSection from "../CommentSection/CommentSection";
import axios from "axios";
import britney from "../../assets/images/britney.gif";
import Loading from "../Loading/Loading";
const baseUrl = process.env.REACT_APP_BASE_URL;

function Player({
  recommended,
  handleSubmit,
  user,
  artistFromParams,
  similarArtist,
  handleSimilar,
  artistId,
  setArtistId,
  similarLoading,
}) {

  const [newLike, setNewLike] = useState(null);

  const handleSave = async (event) => {
    event.preventDefault();

    if (recommended) {
      try {
        const response = await axios.post(`${baseUrl}/api/users/likes`, {
          user_email: user.email,
          artist_name: recommended.artists[0].name,
          artist_id: recommended.artists[0].id,
          artist_img: recommended.album.images[0].url,
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
        });
        setNewLike(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${baseUrl}/api/users/likes`, {
      params: {
        user_email: user.email,
        artist_id: artistId,
      },
    });
    setNewLike(null);
  };

  useEffect(() => {
    if (similarArtist) {
      setArtistId(similarArtist.id);
    } else if (recommended) {
      setArtistId(recommended.artists[0].id);
    } else if (artistFromParams) {
      setArtistId(artistFromParams);
    }
  }, [recommended, artistFromParams, similarArtist, setArtistId]);

  useEffect(() => {
    if (handleSubmit || handleSimilar) {
      setNewLike(false);
    }
  }, [handleSubmit, handleSimilar]);

  if (!recommended && !artistFromParams && !similarArtist) {
    return (
      <div className="output__standby">
        <img
          className="home__britney-gif"
          src={britney}
          alt="gif of britney spears waiting in class"
        />
        <br />
        What are you waiting for...
        <br />
        <strong>Hit us</strong> with your preferences!
      </div>
    );
  }

  return (
    <>
      {!artistId ? (
        <Loading />
      ) : (
        <section className="music-section">
          <div className="spotify-player">
            <div className="spotify-player__action spotify-player__action--shuffle">
              <span>Like what you hear?</span>
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
              title="spotify-iframe"
              src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`}
              width="100%"
              height="152px"
              frameBorder="0"
              allowFullScreen=""
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
                  onClick={handleDelete}
                >
                  Artist saved!
                </button>
              )}
            </div>
          </div>
          <CommentSection
            recommended={recommended}
            user={user}
            artistId={artistId}
            setArtistId={setArtistId}
          />
        </section>
      )}
    </>
  );
}

export default Player;
