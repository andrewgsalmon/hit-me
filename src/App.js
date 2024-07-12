import React, {useState, useEffect} from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Welcome from './pages/Welcome/Welcome';
import Home from './pages/Home/Home';
import ArtistPage from './pages/ArtistPage/ArtistPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';

function App() {
	const [failedAuth, setFailedAuth] = useState(false);
	const [userToken, setUserToken] = useState(null);

	//Login
  useEffect(() => {
		const token = sessionStorage.getItem('token');

		if(!token) {
			setFailedAuth(true)
		}

		if (token) {
			setUserToken(token)
		}

	}, [failedAuth]);

	return (
    <>
      <BrowserRouter>
        <Header failedAuth={failedAuth} />
        <main>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='login' element={<Login userToken={userToken}/>}/>
            <Route path='home' element={<Home />} />
            <Route path='artist/:idFromParams' element={<ArtistPage />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
          </Routes>
        </main>
        {failedAuth ? '' : <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
