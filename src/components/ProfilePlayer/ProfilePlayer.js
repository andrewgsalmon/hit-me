import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ProfilePlayer.scss'
import travolta from '../../assets/images/travolta.gif'
import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL;

function ProfilePlayer({ user }) {
  const [likes, setLikes] = useState(null)
  const [newLikes, setNewLikes] = useState(null)

  useEffect(() => {
    const getLikes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/likes`, {
          params: {
            user_email: user.email
          }
        })
        setLikes(response.data.reverse())
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    }
    getLikes()
  }, [newLikes, user])

  // useEffect(() => {
  //   const getArtistInfo = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/api/users/likes`, {
  //         params: {
  //           user_email: user.email
  //         }
  //       })
  //       setLikes(response.data.reverse())
  //     } catch (error) {
  //       console.error('Error fetching likes:', error);
  //     }
  //   }
  //   getLikes()
  // }, [newLikes, user])

  const handleDelete = async (id) => {
      const response = await axios.delete(`${baseUrl}/api/users/likes`, {
        params: {
          user_email: user.email,
          artist_id: id
        }
      })
      setNewLikes(response)
    }

  if (!user) {
    return <p className='profile-player__no-user'>Loading...</p>
  }

  if (!likes) {
    return <p className='profile-player__no-likes'>Loading...</p>
  }

  return (
    <section className='profile-player'>
      <h2 className='profile-player__heading'>Saved Artists</h2>
      <div className='profile-player__saved-artists-container'>
        {likes.length < 1
          ? <article className='profile-player__placeholder'><img className='profile-player__gif' src={travolta} alt='tumbleweed gif from the simpsons' /><p className='profile-player__text-placeholder'>Nothing to see here yet... <br />Your saved music will appear here!</p></article>
          : likes.map((like) => {
            return <article key={like.id} className='profile-player__artist'>
              <div className='profile-player__remove-like--tablet' onClick={() => handleDelete(like.artist_id)}></div>
              <div className='profile-player__remove-like--mobile' onClick={() => handleDelete(like.artist_id)}>remove</div>
              <img className='profile-player__thumb' src={like.artist_img} alt='' />
              <div className='profile-player__artist-info'>
                <div className='profile-player__artist-name'><h3 className='profile-player__artist-h3'>{like.artist_name}</h3></div>
                <Link className='profile-player__link' to={`https://open.spotify.com/artist/${like.artist_id}`} target='_blank'>Play on Spotify</Link>
              </div>
            </article>
          })
        }
      </div>
    </section>
  )
}

export default ProfilePlayer