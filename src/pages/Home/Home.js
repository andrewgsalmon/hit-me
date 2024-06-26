import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Head from '../../layout/Head';
import './Home.scss'
import Inputs from '../../components/Inputs/Inputs';
import FailedAuth from '../../components/FailedAuth/FailedAuth';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

function Home() {
  const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);

	const { idFromParams } = useParams();

	useEffect(() => {
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
		return <FailedAuth />;
	}

  return (
    <>
      <Head title="Home" description="You must register to use the Hit Me app." canonical="/home"/>
			{!user ? <Loading /> : <Inputs user={user} idFromParams={idFromParams}/>}
    </>
  )
}

export default Home