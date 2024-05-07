import React, { useState, useEffect } from 'react'
import './Player.scss'
import CommentSection from '../CommentSection/CommentSection'
import axios from 'axios'
import britney from '../../assets/images/britney.gif'
const baseUrl = process.env.REACT_APP_BASE_URL;

function Player({ accessToken, recommended, handleSubmit, user, liked, artistFromParams }) {
  const [artistId, setArtistId] = useState(null)
  const [newLike, setNewLike] = useState(null)

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/users/likes`, {
        user_email: user.email,
        artist_name: recommended.artists[0].name,
        artist_id: recommended.artists[0].id,
        artist_img: recommended.album.images[0].url
      })
      setNewLike(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (recommended) {
      setArtistId(recommended.artists[0].id)
    } else if (artistFromParams) {
      setArtistId(artistFromParams)
    }
  }, [recommended, artistFromParams])

  useEffect(() => {
    if (handleSubmit) {
      setNewLike(false)
    }
  }, [handleSubmit])

  if (!recommended && !artistFromParams) {
    return <div className='output__standby'>
      <img className='home__britney-gif' src={britney} alt="gif of britney spears waiting in class" />
      <br />What are you waiting for...<br /><strong>Hit us</strong> with your preferences!
    </div>
  }

  return (
    <>
      <section className='music-section'>
        <div className='spotify-player'>
          <div className='spotify-player__action spotify-player__action--shuffle'>
            <span>Want something else?</span>
            <button className='spotify-player__action-button spotify-player__action-button--shuffle' type='submit' onClick={handleSubmit}>HIT AGAIN!</button>
          </div>
          <iframe title='spotify-iframe' src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`} width="100%" height="152px" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          <div className='spotify-player__action spotify-player__action--like'>
            {!newLike ? <button className='spotify-player__action-button spotify-player__action-button--save' type='submit' onClick={handleSave}>Save this artist</button> :
              <button className='spotify-player__action-button spotify-player__action-button--saved' type='submit' onClick={handleSave}>Artist saved!</button>}
          </div>
        </div>
        <CommentSection recommended={recommended} user={user} />
      </section>
    </>
  )
}

export default Player