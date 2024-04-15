import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/hitme-logo.png'
import './Header.scss'

function Header() {
  return (
    <>
      <header className='header'>
        <Link className='header-logo' to='/home'><img className='header-logo' src={logo} alt='hit me logo' /></Link>
        <nav className='nav-bar'>
          <article className='nav-bar__profile-avatar'></article>
          <span className='nav-bar__profile-name'>Sign in</span>
        </nav>
      </header>
    </>

  )
}

export default Header