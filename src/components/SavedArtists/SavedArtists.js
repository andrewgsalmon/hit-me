import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SavedArtists.scss";
import travolta from "../../assets/images/travolta.gif";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

function SavedArtists({ user }) {
  const [likes, setLikes] = useState(null);
  const [newLikes, setNewLikes] = useState(null);

  const notify = (artistName) => {
    toast.success(
      `Successfully removed ${artistName} from your saved artists.`,
      {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      }
    );
  };

  useEffect(() => {
    const getLikes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/likes`, {
          params: {
            user_email: user.email,
          },
        });
        setLikes(response.data.reverse());
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    getLikes();
  }, [newLikes, user]);

  const handleDelete = async (id, artistName, savedArtistId) => {
    const response = await axios.delete(`${baseUrl}/api/users/likes`, {
      params: {
        user_email: user.email,
        artist_id: id,
      },
    });
    const like = document.getElementById(savedArtistId);
    like.classList.add("saved-artists__artist--delete")

    setTimeout(() => {
      notify(artistName);
      setNewLikes(response);
    }, 800);
  };

  if (!user) {
    return <p className="saved-artists__no-user">Loading...</p>;
  }

  if (!likes) {
    return <p className="saved-artists__no-likes">Loading...</p>;
  }

  return (
    <section className="saved-artists">
      <h2 className="saved-artists__heading">Saved Artists</h2>
      <div className="saved-artists__saved-artists-container">
        {likes.length < 1 ? (
          <article className="saved-artists__placeholder">
            <img
              className="saved-artists__gif"
              src={travolta}
              alt="john travolta confused gif from pulp fiction"
            />
            <p className="saved-artists__text-placeholder">
              Nothing to see here yet... <br />
              Your saved music will appear here!
            </p>
          </article>
        ) : (
          likes.map((like) => {
            let savedArtistId = `saved-artist-${like.id}`

            return (
              <article key={like.id} id={savedArtistId} className="saved-artists__artist">
                <div
                  className="saved-artists__remove-like--tablet"
                  onClick={() => handleDelete(like.artist_id, like.artist_name, savedArtistId)}
                ></div>
                <div
                  className="saved-artists__remove-like--mobile"
                  onClick={() => handleDelete(like.artist_id, like.artist_name, savedArtistId)}
                >
                  remove
                </div>
                  <img
                    className="saved-artists__thumb"
                    src={like.artist_img}
                    alt={like.artist_name}
                  />
                <div className="saved-artists__artist-info">
                  <div className="saved-artists__artist-name">
                    <h3 className="saved-artists__artist-h3">
                      {like.artist_name}
                    </h3>
                    <h4 className="saved-artists__artist-info--genre">
                      {like.artist_genre}
                    </h4>
                  </div>
                  <Link
                    className="saved-artists__link"
                    to={`../artist/${like.artist_id}`}
                  >
                    Listen now
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </div>
      <ToastContainer />
    </section>
  );
}

export default SavedArtists;
