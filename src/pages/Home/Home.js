import React, { useState, useEffect } from 'react';
import './Home.scss'
import Inputs from '../../components/Inputs/Inputs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import garth from '../../assets/images/garth.gif'
const baseUrl = process.env.REACT_APP_BASE_URL;

function Home() {
  const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);

	useEffect(() => {
		// getItem from sessionStorage token
		const token = sessionStorage.getItem('token');

		if(!token) {
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

			} catch(error) {
				setFailedAuth(true)
			}
		}
		authorizeUser()
	}, [failedAuth]);

	if (failedAuth) {
		return (
			<section className="failed-auth">
				<img className="failed-auth__giphy-embed" src={garth} alt='gif of garth from waynes world saying no way'/>
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
      <Inputs user={user} />
    </>
  )
}

export default Home