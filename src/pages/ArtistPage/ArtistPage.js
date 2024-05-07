import React, { useEffect, useState } from 'react';
import Head from '../../layout/Head';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../../components/CommentSection/CommentSection';
import garth from '../../assets/images/garth.gif'
import './ArtistPage.scss'
const baseUrl = process.env.REACT_APP_BASE_URL;

function ArtistPage() {
  const { idFromParams } = useParams();
  const [comments, setComments] = useState(null)
  const [failedAuth, setFailedAuth] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {
    // getItem from sessionStorage token
    const token = sessionStorage.getItem('token');

    if (!token) {
      setFailedAuth(true)
    }

    const authorizeUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/current`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setUser(response.data)

      } catch (error) {
        setFailedAuth(true)
      }
    }
    authorizeUser()
  }, [failedAuth]);

  useEffect(() => {
    const getComments = async () => {
      if (idFromParams) {
        try {
          const response = await axios.get(`${baseUrl}/api/artists/comments/${idFromParams}`)
          setComments((response.data).reverse())
        } catch (error) {
          error.log(error)
        }
      }
    }
    getComments()
  }, [idFromParams])

  if (failedAuth) {
    return (
      <section className="failed-auth">
        <img className="failed-auth__giphy-embed" src={garth} alt='gif of garth from waynes world saying no way' />
        <p>WHOOPS! <br />You gotta login to use this app...</p>
        <Link className='failed-auth__login-link' to="/login">LOG IN</Link>
      </section>
    );
  }

  if (user === null) {
    return (
      <main className="dashboard">
        <p className='home__loading'>Loading...</p>
      </main>
    );
  }


  return (
    <>
      <Head title="Listen" />
      <section className='artist__player'>
        <iframe title='spotify-iframe' src={`https://open.spotify.com/embed/artist/${idFromParams}?utm_source=generator`} width="100%" height="152px" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </section>
      <CommentSection idFromParams={idFromParams} user={user} comments={comments} />
    </>
  )
}

export default ArtistPage