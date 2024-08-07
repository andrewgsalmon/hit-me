import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SavedArtist from "../SavedArtist/SavedArtist";
import Loading from "../Loading/Loading";
import "./SavedArtistList.scss";
import travolta from "../../assets/images/travolta.gif";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

function SavedArtistList({ user }) {
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
    like.classList.add("saved-artists__artist--delete");

    setTimeout(() => {
      notify(artistName);
      setNewLikes(response);
    }, 500);
  };

  if (!user || !likes) {
    return <Loading />;
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
            return (
              <SavedArtist key={like.id} like={like} handleDelete={handleDelete} />
            );
          })
        )}
      </div>
      <ToastContainer />
    </section>
  );
}

export default SavedArtistList;
