import React from "react";
import { Link } from "react-router-dom";
import garth from '../../assets/images/garth.gif';
import './FailedAuth.scss';

function FailedAuth() {
  return (
    <section className="failed-auth">
      <img
        className="failed-auth__giphy-embed"
        src={garth}
        alt="gif of garth from waynes world saying no way"
      />
      <p>
        WHOOPS! <br />
        You gotta login to use this app...
      </p>
      <Link className="failed-auth__login-link" to="/login">
        LOG IN
      </Link>
    </section>
  );
}

export default FailedAuth;
