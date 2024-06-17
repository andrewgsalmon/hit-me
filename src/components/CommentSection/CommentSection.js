import React, { useState, useEffect } from "react";
import "./CommentSection.scss";
import Comment from "../Comment/Comment";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

function CommentSection({ user, idFromParams, artistClass, artistId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(null);
  const [artist, setArtist] = useState(idFromParams);

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
        return (
          <section className="dashboard artist__comments">
            <p className="home__loading artist__loading">Loading...</p>
          </section>
        );
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
          <div className="comments__avatar"></div>
          <form onSubmit={handleSubmit} className="comments__input">
            <span className="comments__textarea-label">Like the tunes? Let us know!</span>
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
    </>
  );
}

export default CommentSection;
