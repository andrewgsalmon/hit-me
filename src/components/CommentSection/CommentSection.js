import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CommentSection.scss";
import Comment from "../Comment/Comment";
import Loading from "../Loading/Loading";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

function CommentSection({ user, idFromParams, artistClass, artistId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(null);
  const [artist, setArtist] = useState(idFromParams);

  const avatar = {backgroundImage: `url('${user.profile_img}')`}

  const notify = (type, message) => {
    if (type === "error") {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }
  };

  useEffect(() => {
    if (idFromParams) {
      setArtist(idFromParams);
    } else if (artistId) {
      setArtist(artistId);
    }
  }, [idFromParams, artist, artistId]);

  useEffect(() => {
    const getComments = async () => {
      if (!artist && !idFromParams) {
        return <Loading />
      }

      if (artist) {
        try {
          const response = await axios.get(
            `${baseUrl}/api/artists/comments/${artist}`
          );
          setComments(response.data.reverse());
        } catch (error) {
          error.log(error);
        }
      }
    };
    getComments();
  }, [newComment, artist, idFromParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.target.comment.value) {
      return notify("error", "Are you new to this? Add a comment before posting!")
    }

    try {
      const response = await axios.post(`${baseUrl}/api/artists/comment/`, {
        name: user.name,
        email: user.email,
        comment: event.target.comment.value,
        artist_id: artist,
      });
      setNewComment(response);
      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className={artistClass ? artistClass : "comments"}>
        <div className="comments__container">
          <div className="comments__avatar" style={avatar}></div>
          <form onSubmit={handleSubmit} className="comments__input">
            <label className="comments__textarea-label" htmlFor="comment">Like the tunes? Let us know!</label>
            {comments.length > 0 ? (
              <textarea
                className="comments__textarea"
                name="comment"
                id="comment"
                rows="5"
                placeholder="comment here..."
              />
            ) : (
              <textarea
                className="comments__textarea"
                name="comment"
                id="comment"
                rows="5"
                placeholder="Be the first to comment!"
              />
            )}
            <button className="comments__button" type="submit">Post</button>
          </form>
        </div>
        {artist
          ? comments.map((artistComment) => {
              return (
                <Comment key={artistComment.id} artistComment={artistComment} />
              );
            })
          : ""}
      </section>
      <ToastContainer />
    </>
  );
}

export default CommentSection;
