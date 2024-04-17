import React, {useState, useEffect} from 'react'
import './Profile.scss'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import axios from 'axios';
import { Link } from 'react-router-dom';
import garth from '../../assets/images/garth.gif'
const baseUrl = process.env.REACT_APP_BASE_URL;

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);
	const token = sessionStorage.getItem('token');
	// const [userToken, setUserToken] = useState(null);

	if (!currentUser) {
	const authorizeUser = async () => {
		try {
			const response = await axios.get(`${baseUrl}/api/users/current`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setCurrentUser(response.data)

		} catch(error) {
			setFailedAuth(true)
		}
	}
	authorizeUser()
}

  // useEffect(() => {
	// 	// getItem from sessionStorage token

	// }, [currentUser]);

	if (failedAuth) {
		return (
			<section className="failed-auth">
				<img className="failed-auth__giphy-embed" src={garth} alt='gif of garth from waynes world saying no way'/>
        <p>WHOOPS! <br />You gotta login to use this app...</p>
        <Link className='failed-auth__login-link' to="/login">LOG IN</Link>
			</section>
		);
	}

	console.log(failedAuth)
	console.log(currentUser)

  return (
    <>
      <ProfileInfo />
    </>
  )
}

export default Profile