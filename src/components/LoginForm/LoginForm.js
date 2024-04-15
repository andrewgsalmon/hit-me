import React, { useState } from 'react';
import './LoginForm.scss'
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

function LoginForm() {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/users/login`, {
        email: event.target.email.value,
        password: event.target.password.value,
      })

      sessionStorage.setItem('token', response.data.token);

      // redirect upon successful login
      window.location.href = '/home'

    } catch (error) {
      setError(error.response)
    }
  };

  return (
    <>
      <section className='login'>
        <div className='login__desktop-column'>
          <h1 className='login__heading'>Sign In</h1>
          <div className='login__register-link'>No account yet? <br />Register <a href='./register'>here!</a></div>
        </div>
        <form onSubmit={handleSubmit} className='login__form'>
          <label className='login__form-label login__form-label--email' htmlFor="email">Email</label>
          <input className='login__form-input login__form-input--email' type="text" id='email' name='email' placeholder='ringo@beatles.co.uk' required />
          <label className='login__form-label login__form-label--password' htmlFor="password">Password</label>
          <input className='login__form-input login__form-input--password' type="password" id='password' name='password' placeholder='********' required />
          <button type='submit' className='login__form-submit'>LET ME IN</button>
          {/* <a className='login__oauth' href={`${baseUrl}/auth/spotify`}>Or sign in via Spotify</a> */}
        </form>
      </section>
      {error ? <p className='login__error'>{error.data}</p> : ''}
    </>
  )
}

export default LoginForm