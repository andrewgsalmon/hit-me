import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './RegisterForm.scss';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

function RegisterForm() {
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null)
  const [pwUnmatched, setPwUnmatched] = useState(null)
  const [pw, setPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const handleChange = (event) => {
    let {name, value} = event.target;

    if (name === 'password') {
      setPw(value)
    } else if (name === 'confirmPassword') {
      setConfirmPw(value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(pw!==confirmPw) {
      setError(`Whoops! Your passwords don't match... let's try that again.`)
      setPwUnmatched(true)
      setStatus(false)
    }

    try {
      const response = await axios.post(`${baseUrl}/api/users/register`, {
        email: event.target.email.value,
        password: event.target.password.value,
        name: event.target.display_name.value,
        fav_artists: event.target.artists.value,
        location: event.target.location.value
      })
      if (response && pw===confirmPw) {
        setStatus(true)
        setError(false)
        event.target.reset()
      }

    } catch (error) {
      if(pwUnmatched) {
        setStatus(false)
      } else {
        setStatus(false)
        setError(error.response.data);
      }
    }

  }

  return (
    <section className='register'>
      <h1 className='register__heading'>Sign up for Hit Me!</h1>
      <span className='register__login-link'>Already signed up?  Login <a href='./login'>here</a>!</span>
      {/* <a className='register__oauth' href={`${baseUrl}/auth/spotify`}>Or register via Spotify</a> */}
      <form onSubmit={handleSubmit} className="register__form">
        <div className='register__form--tablet-column'>
          <label className='register__form-label register__form-label--name' htmlFor="display_name">Display Name</label>
          <input className='register__form-input register__form-input--name' type="text" id='display_name' name='display_name' placeholder='required'/>
          <label className='register__form-label register__form-label--email' htmlFor="email">Email</label>
          <input className='register__form-input register__form-input--email' type="text" name='email' id='email' placeholder='required'/>
          <label className='register__form-label register__form-label--password' htmlFor="password" >Password</label>
          <input onChange={handleChange} className='register__form-input register__form-input--password' type="password" name='password' placeholder='required'/>
          <label className='register__form-label register__form-label--confirm-password' htmlFor="confirmPassword">Confirm Password</label>
          <input onChange={handleChange} className='register__form-input register__form-input--confirm-password' type="password" name='confirmPassword' placeholder='required'/>
        </div>
        <div className='register__form--tablet-column'>
          <label className='register__form-label register__form-label--location' htmlFor="location">Location</label>
          <input className='register__form-input register__form-input--location' type="text" name='location' id='location'/>
          <label className='register__form-label register__form-label--artists' htmlFor="artists">Name a few of your favourite artists</label>
          <textarea className='register__form-input register__form-input--artists' rows='5' name='artists' id='artists'/>
          <button className='register__form-submit'>Let's go!</button>
        </div>
      </form>
      {status ? <div className="register__message register__message--success">Registration complete! <br /><Link to='/login'>Sign in</Link>, homeslice!</div> : pwUnmatched ? <div className="register__message register__message--error">{error}</div> : !error ? '' : <div className="register__message register__message--error">{error}</div>}
    </section>
  )
}

export default RegisterForm