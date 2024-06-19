import React, { useState, useEffect } from 'react'
import './ProfileInfo.scss'
import axios from 'axios';
import ProfilePlayer from '../ProfilePlayer/ProfilePlayer';
const baseUrl = process.env.REACT_APP_BASE_URL;

function ProfileInfo({currentUser}) {
	const [user, setUser] = useState(currentUser);

	useEffect(() => {
		const token = sessionStorage.getItem('token');

		const getUserInfo = async () => {
			try {
				const response = await axios.get(`${baseUrl}/api/users/current`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				setUser(response.data)

			} catch (error) {
				console.error(error);
			}
		}
		getUserInfo()

	}, []);

	if (!user) {
		return <div className='profile__loading'>Loading...</div>
	}

	return (
		<>
			<section className='profile'>
				<div className='profile__info'>
					<div className='profile__identity'>
						<div className='profile__avatar'></div>
						<div className='profile__heading-container'><h1 className='profile__heading'>{user.name}</h1></div>
					</div>
					<div className='profile__details'>
						<div className='profile__detail profile__email'>
							<span className='profile__label profile__label--email'>email</span>
							<p className='profile__value profile__value--email'>{user.email}</p>
						</div>
						<div className='profile__detail profile__location'>
							<span className='profile__label profile__label--location'>Location</span>
							<p className='profile__value profile__value--location'>{user.location ? user.location : '(not provided)'}</p>
						</div>
						<div className='profile__detail profile__artists'>
							<span className='profile__label profile__label--fav-artists'>Favourite Artists</span>
							<p className='profile__value profile__value--fav-artists'>{user.fav_artists ? user.fav_artists : '(not provided)'}</p>
						</div>
					</div>
				</div>
			</section>
			<ProfilePlayer user={user} />
		</>
	)
}

export default ProfileInfo