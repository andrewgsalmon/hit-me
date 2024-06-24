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
    toast.success(`Successfully removed ${artistName} from your saved artists.`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  }

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

  const handleDelete = async (id, artistName) => {
    const response = await axios.delete(`${baseUrl}/api/users/likes`, {
      params: {
        user_email: user.email,
        artist_id: id,
      },
    });
    notify(artistName)
    setNewLikes(response);
  };

  if (!user) {
    return <p className="profile-player__no-user">Loading...</p>;
  }

  if (!likes) {
    return <p className="profile-player__no-likes">Loading...</p>;
  }

  return (
    <section className="profile-player">
      <h2 className="profile-player__heading">Saved Artists</h2>
      <div className="profile-player__saved-artists-container">
        {likes.length < 1 ? (
          <article className="profile-player__placeholder">
            <img
              className="profile-player__gif"
              src={travolta}
              alt="john travolta confused gif from pulp fiction"
            />
            <p className="profile-player__text-placeholder">
              Nothing to see here yet... <br />
              Your saved music will appear here!
            </p>
          </article>
        ) : (
          likes.map((like) => {
            return (
              <article key={like.id} className="profile-player__artist">
                <div
                  className="profile-player__remove-like--tablet"
                  onClick={() => handleDelete(like.artist_id, like.artist_name)}
                ></div>
                <div
                  className="profile-player__remove-like--mobile"
                  onClick={() => handleDelete(like.artist_id, like.artist_name)}
                >
                  remove
                </div>
                <img
                  className="profile-player__thumb"
                  src={like.artist_img}
                  alt={like.artist_name}
                />
                <div className="profile-player__artist-info">
                  <div className="profile-player__artist-name">
                    <h3 className="profile-player__artist-h3">
                      {like.artist_name}
                    </h3>
                  </div>
                  <Link
                    className="profile-player__link"
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
