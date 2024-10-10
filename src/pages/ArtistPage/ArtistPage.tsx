import React, { useEffect, useState } from "react";
import Head from "../../layout/Head";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentSection from "../../components/CommentSection/CommentSection";
import FailedAuth from "../../components/FailedAuth/FailedAuth";
import Loading from "../../components/Loading/Loading";
import {User} from '../../types/user';

import "./ArtistPage.scss";
const baseUrl = process.env.REACT_APP_BASE_URL;

interface RouteParams {
  idFromParams: string;
  [key: string]: string | undefined;
}

function ArtistPage() {
  const { idFromParams } = useParams<RouteParams>();
  const [failedAuth, setFailedAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  window.scrollTo(0,0);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setFailedAuth(true);
    }

    const authorizeUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/current`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        sessionStorage.removeItem('token');
        setFailedAuth(true);
      }
    };
    authorizeUser();
  }, [failedAuth]);

  if (!idFromParams) {
    return <Loading />;
  }

  if (failedAuth) {
    return <FailedAuth />;
  }

  return (
    <>
      <Head title="Listen" description="Discover your new favourite artist on Hit Me!" canonical={`/home/${idFromParams}`} />
      {!user ? (
        <Loading />
      ) : (
        <>
          <section className="artist artist__player">
            <iframe
              id="spotify-iframe"
              title="spotify-iframe"
              src={`https://open.spotify.com/embed/artist/${idFromParams}?utm_source=generator`}
              width="100%"
              height="152px"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </section>
          <CommentSection
            user={user}
            artistId={idFromParams}
          />
        </>
      )}
    </>
  );
}

export default ArtistPage;
