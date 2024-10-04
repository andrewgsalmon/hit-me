import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CommentSection.scss";
import Comment from "../Comment/Comment";
import axios from "axios";
import {User} from '../../types/user';
import {ArtistComment} from '../../types/artist';

interface RouteParams {
  idFromParams: string;
  [key: string]: string | undefined;
};

const baseUrl = process.env.REACT_APP_BASE_URL;

interface InputsProps {
  user: User;
  artistId: string | null;
}

function CommentSection({ user, artistId }: InputsProps) {
  const {idFromParams} = useParams<RouteParams>();

  const [comments, setComments] = useState<ArtistComment[]>([]);
  const [newComment, setNewComment] = useState<{} | null>(null);
  const [artist, setArtist] = useState<string | undefined>(idFromParams);

  const avatar = {backgroundImage: `url('${user.profile_img}')`}

  const notify = (type: string, message: string) => {
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
  }, [artist, artistId, idFromParams]);

  useEffect(() => {
    const getComments = async () => {
      if (!artist && !idFromParams) {
        setComments([]);
      }

      if (artist) {
        try {
          const response = await axios.get(
            `${baseUrl}/api/artists/comments/${artist}`
          );
          setComments(response.data.reverse());
        } catch (error: any) {
          console.error(error);
        }
      }
    };
    getComments();
  }, [newComment, artist, idFromParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const {comment} = form;

    if (!comment) {
      return notify("error", "Are you new to this? Add a comment before posting!")
    }

    try {
      const response = await axios.post(`${baseUrl}/api/artists/comment/`, {
        name: user.name,
        email: user.email,
        comment: comment.value,
        artist_id: artist,
      });
      setNewComment(response);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className={"artist artist__comments"}>
        <div className="comments__container">
          <div className="comments__avatar" style={avatar} aria-label={`${user.name}'s profile picture`}></div>
          <form onSubmit={handleSubmit} className="comments__input">
            <label className="comments__textarea-label" htmlFor="comment">Like the tunes? Let us know!</label>
            {comments.length > 0 ? (
              <textarea
                className="comments__textarea"
                name="comment"
                id="comment"
                rows={5}
                placeholder="comment here..."
              />
            ) : (
              <textarea
                className="comments__textarea"
                name="comment"
                id="comment"
                rows={5}
                placeholder="Be the first to comment!"
              />
            )}
            <button className="comments__button" type="submit">Post</button>
          </form>
        </div>
        {artist
          ? comments?.map((artistComment: ArtistComment) => {
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
