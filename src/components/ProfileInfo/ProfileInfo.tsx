import React, { useState, useEffect } from 'react'
import './ProfileInfo.scss'
import axios from 'axios';
import SavedArtistList from '../SavedArtistList/SavedArtistList';
import Loading from '../Loading/Loading';
import AvatarModal from '../AvatarModal/AvatarModal';
import {User} from '../../types/user';
const baseUrl = process.env.REACT_APP_BASE_URL;

interface ProfileInfoProps {
	currentUser: User;
}

function ProfileInfo({currentUser}: ProfileInfoProps) {
	const [user, setUser] = useState<User | null>(currentUser);
	const [modal, setModal] = useState<boolean>(false)
	const avatar = {backgroundImage: `url('${user?.profile_img}')`}

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
				sessionStorage.removeItem('token');
				console.error(error);
			}
		}
		getUserInfo()

	}, []);

  const modalToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
		setModal(!modal)
  }

	if (!user) {
		return <Loading />;
	}

	return (
		<>
			<section className='profile'>
				{modal && <AvatarModal modalToggle={modalToggle} user={user}/>}
					<div className='profile__info'>
					<div className='profile__identity'>
						<div className='profile__avatar' style={avatar} aria-label={`profile photo of ${user.name}`}>
							<form className='profile__avatar--edit'>
								<button aria-label='click to upload an avatar' onClick={modalToggle} className='profile__avatar--upload'></button>
							</form>
						</div>
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
			<SavedArtistList user={user} />
		</>
	)
}

export default ProfileInfo