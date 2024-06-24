import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/hitme-logo.png";
import githubIcon from "../../assets/icons/icons8-github.svg";
import linkedInIcon from "../../assets/icons/icons8-linkedin-circled.svg";
import instagramIcon from "../../assets/icons/icons8-instagram.svg";
import "./Header.scss";

function Header() {
  return (
    <>
      <header className="header">
        <Link className="header-logo" to="/home">
          <img className="header-logo" src={logo} alt="hit me logo" />
        </Link>
        <br />
        <div className="social-icons">
          {/* <span className="social-icons__label">Learn more:</span> */}
          <a href="https://www.instagram.com/hitme.rocks" target="_blank" rel="noreferrer"><img className="social-icons__icon social-icons__icon--instagram" src={instagramIcon} alt="instagram icon" /></a>
          <a href="https://www.linkedin.com/in/andrewgsalmon" target="_blank" rel="noreferrer"><img className="social-icons__icon social-icons__icon--linkedin" src={linkedInIcon} alt="linkedin icon" /></a>
          <a href="https://www.github.com/andrewgsalmon/hit-me" target="_blank" rel="noreferrer"><img className="social-icons__icon social-icons__icon--github" src={githubIcon} alt="github icon" /></a>
        </div>
        {/* <nav className='nav-bar'>
          <article className='nav-bar__profile-avatar'></article>
          <span className='nav-bar__profile-name'>Sign in</span>
        </nav> */}
      </header>
    </>
  );
}

export default Header;
