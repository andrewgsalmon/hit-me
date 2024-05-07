import React, { useState, useEffect } from 'react'
import './CommentSection.scss'
import Comment from '../Comment/Comment'
import axios from 'axios'
// import { useParams } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL;

function CommentSection({ recommended, user, idFromParams }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState(null);
  const [artistId, setArtistId] = useState(idFromParams);

  // const {idFromParams} = useParams();

  useEffect(() => {
    if (idFromParams && !recommended) {
      setArtistId(idFromParams)
    } else if (recommended) {
      setArtistId(recommended.artists[0].id)
    }
  }, [idFromParams, recommended])

  console.log(artistId)
  console.log(recommended)
  console.log(idFromParams)

  useEffect(() => {
    const getComments = async () => {
      if (!recommended && !idFromParams) {
        return (
          <section className="dashboard artist__comments">
            <p className='home__loading artist__loading'>Loading...</p>
          </section>
        );
      }

      if (recommended || idFromParams) {
        try {
          const response = await axios.get(`${baseUrl}/api/artists/comments/${artistId}`)
          setComments((response.data).reverse())
        } catch (error) {
          error.log(error)
        }
      }
    }
    getComments()
  }, [recommended, newComment, artistId, idFromParams])

  console.log(comments)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/artists/comment/`, {
        name: user.name,
        email: user.email,
        comment: event.target.comment.value,
        artist_id: artistId
      })
      setNewComment(response)
      event.target.reset();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <section className='comments'>
        <div className='comments__container'>
          <div className='comments__avatar'></div>
          <form onSubmit={handleSubmit} className='comments__input'>
            <span className='comments__textarea-label'>Like the tunes? Let us know!</span>
            {comments.length > 0 ? <textarea className='comments__textarea' name="comment" id="comment" rows="5" placeholder='comment here...' /> : <textarea className='comments__textarea' name="comment" id="comment" rows="5" placeholder='Be the first to comment!' />}
            <button className='comments__button' type='submit'>Post</button>
          </form>
        </div>
        {artistId ? comments.map((artistComment) => {
          return <Comment key={artistComment.id} artistComment={artistComment} />
        }) : ""}
      </section>
    </>
  )
}

export default CommentSection