import React, { useState } from "react";
import Head from "../../layout/Head";
import "./Profile.scss";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import FailedAuth from "../../components/FailedAuth/FailedAuth";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
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
        sessionStorage.removeItem('token');
        setFailedAuth(true);
      }
    };
    authorizeUser();
  }

  if (failedAuth) {
    return <FailedAuth />;
  }

  return (
    <>
      <Head title="Profile" description="Login to view your profile and saved artists on Hit Me" canonical="/profile" />
      {!currentUser ? <Loading /> : <ProfileInfo currentUser={currentUser} />}
    </>
  );
}

export default Profile;
