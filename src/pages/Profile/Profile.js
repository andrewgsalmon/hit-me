import React, { useState } from "react";
import Head from "../../layout/Head";
import "./Profile.scss";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import axios from "axios";
import { Link } from "react-router-dom";
import garth from "../../assets/images/garth.gif";
const baseUrl = process.env.REACT_APP_BASE_URL;

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const token = sessionStorage.getItem("token");

  if (!currentUser) {
    const authorizeUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/current`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser(response.data);
      } catch (error) {
        setFailedAuth(true);
      }
    };
    authorizeUser();
  }

  if (failedAuth) {
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

  return (
    <>
      <Head title="Profile" />
      <ProfileInfo currentUser={currentUser} />
    </>
  );
}

export default Profile;
