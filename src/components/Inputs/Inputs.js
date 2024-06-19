import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Inputs.scss";
import Player from "../Player/Player";
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function Inputs({ user, idFromParams }) {
  const [recommended, setRecommended] = useState(null);
  const [genreSelected, setGenreSelected] = useState(null);
  const [popularity, setPopularity] = useState(100);
  const [accessToken, setAccessToken] = useState(null);
  const [liked, setLiked] = useState(false);
  const [artistFromParams, setArtistFromParams] = useState(null);
  const [similarArtist, setSimilarArtist] = useState(null);
  const [artistId, setArtistId] = useState(null);

  const notify = (type, message) => {
    if (type === 'error') {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide
      });
    }
  };

  // GET Spotify access token
  useEffect(() => {
    const apiUrl = `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}`;

    const header = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const requestOptions = {
      method: "POST",
      headers: header,
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAccessToken(data.access_token);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  }, []);

  useEffect(() => {
    if (idFromParams) {
      const apiUrl = `https://api.spotify.com/v1/artists/${idFromParams}`;
      const header = {
        Authorization: `Bearer ${accessToken}`,
      };

      // Create the request options object
      const requestOptions = {
        method: "GET",
        headers: header,
      };

      // Make the API call
      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setArtistFromParams(data);
          setLiked(false);
        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
        });
    }
  }, [accessToken, idFromParams]);

  const handleGenreChange = (e) => {
    const { value } = e.target;
    setGenreSelected(value);
  };

  const handlePopularity = (e) => {
    const { value } = e.target;
    setPopularity(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!genreSelected) {
      notify("error", "Ahem... a genre, please?");
    }

    if (genreSelected) {
      setTimeout(() => {
        setSimilarArtist(false);
      }, 1000);
      const apiUrl = `https://api.spotify.com/v1/recommendations?limit=100&market=CA&seed_genres=${genreSelected}&target_popularity=${popularity}`;
      const header = {
        Authorization: `Bearer ${accessToken}`,
      };

      // Create the request options object
      const requestOptions = {
        method: "GET",
        headers: header,
      };

      // Make the API call
      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const randomIndex = Math.floor(Math.random() * 100);
          setRecommended(data.tracks[randomIndex]);
          setLiked(false);
        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
        });
    }
  };

  const handleSimilar = (e) => {
    e.preventDefault();

    if (recommended) {
      setTimeout(() => {
        setRecommended(false);
      }, 1000);
    }
    const apiUrl = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
    const header = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Create the request options object
    const requestOptions = {
      method: "GET",
      headers: header,
    };

    // Make the API call
    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.artists.length);
        setSimilarArtist(data.artists[randomIndex]);
        setLiked(false);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  };

  return (
    <>
      <h1 className="home__heading">Welcome, {user.name}!</h1>
      <div className="home__desktop-toggle">
        <section className="inputs">
          <form onSubmit={handleSubmit} className="inputs__form">
            <div className="inputs__genre">
              <label
                className="form__input-label form__input-label--genre"
                htmlFor="inputs__genre-selector"
              >
                What genre are you in the mood for today?
              </label>
              <select
                name="inputs__genre-selector"
                id="inputs__genre-selector"
                onChange={handleGenreChange}
              >
                <option value="">--select your genre--</option>
                <option value="acoustic">Acoustic</option>
                <option value="afrobeat">Afrobeat</option>
                <option value="alt-rock">Alt Rock</option>
                <option value="alternative">Alternative</option>
                <option value="ambient">Ambient</option>
                <option value="anime">Anime</option>
                <option value="black-metal">Black Metal</option>
                <option value="bluegrass">Bluegrass</option>
                <option value="blues">Blues</option>
                <option value="bossanova">Bossa Nova</option>
                <option value="brazil">Brazil</option>
                <option value="breakbeat">Breakbeat</option>
                <option value="british">British</option>
                <option value="cantopop">Cantopop</option>
                <option value="chicago-house">Chicago House</option>
                <option value="children">Children</option>
                <option value="chill">Chill</option>
                <option value="classical">Classical</option>
                <option value="club">Club</option>
                <option value="comedy">Comedy</option>
                <option value="country">Country</option>
                <option value="dance">Dance</option>
                <option value="dancehall">Dance Hall</option>
                <option value="death-metal">Death Metal</option>
                <option value="deep-house">Deep House</option>
                <option value="detroit-techno">Detroit Techno</option>
                <option value="disco">Disco</option>
                <option value="disney">Disney</option>
                <option value="drum-and-bass">Drum n Bass</option>
                <option value="dub">Dub</option>
                <option value="dubstep">Dubstep</option>
                <option value="edm">EDM</option>
                <option value="electro">Electro</option>
                <option value="electronic">Electronic</option>
                <option value="emo">Emo</option>
                <option value="folk">Folk</option>
                <option value="forro">Forro</option>
                <option value="french">French</option>
                <option value="funk">Funk</option>
                <option value="garage">Garage</option>
                <option value="german">German</option>
                <option value="gospel">Gospel</option>
                <option value="goth">Goth</option>
                <option value="grindcore">Grindcore</option>
                <option value="groove">Groove</option>
                <option value="grunge">Grunge</option>
                <option value="guitar">Guitar</option>
                <option value="happy">Happy</option>
                <option value="hard-rock">Hard Rock</option>
                <option value="hardcore">Hardcore</option>
                <option value="hardstyle">Hardstyle</option>
                <option value="heavy-metal">Heavy Metal</option>
                <option value="hip-hop">Hip Hop</option>
                <option value="holidays">Holidays</option>
                <option value="honky-tonk">Honky-tonk</option>
                <option value="house">House</option>
                <option value="idm">IDM</option>
                <option value="indian">Indian</option>
                <option value="indie">Indie</option>
                <option value="indie-pop">Indie-Pop</option>
                <option value="industrial">Industrial</option>
                <option value="iranian">Iranian</option>
                <option value="j-dance">J-Dance</option>
                <option value="j-idol">J-Idol</option>
                <option value="j-pop">J-Pop</option>
                <option value="j-rock">J-Rock</option>
                <option value="jazz">Jazz</option>
                <option value="k-pop">K-Pop</option>
                <option value="kids">Kids</option>
                <option value="latin">Latin</option>
                <option value="latino">Latino</option>
                <option value="Malay">Malay</option>
                <option value="Mandopop">Mandopop</option>
                <option value="metal">Metal</option>
                <option value="metalcore">Metalcore</option>
                <option value="minimal-techno">Minimal Techno</option>
                <option value="Movies">Movies</option>
                <option value="new-age">New Age</option>
                <option value="opera">Opera</option>
                <option value="pagode">Pagode</option>
                <option value="party">Party</option>
                <option value="Piano">Piano</option>
                <option value="pop">Pop</option>
                <option value="pop-film">Pop Film</option>
                <option value="post-dubstep">Post Dubstep</option>
                <option value="power-pop">Power Pop</option>
                <option value="progressive-house">Progressive House</option>
                <option value="psych-rock">Psychedelic Rock</option>
                <option value="punk">Punk</option>
                <option value="r-n-b">RnB</option>
                <option value="reggae">Reggae</option>
                <option value="reggaeton">Reggaeton</option>
                <option value="rock">Rock</option>
                <option value="rock-n-roll">Rock n Roll</option>
                <option value="rockabilly">Rockabilly</option>
                <option value="romance">Romance</option>
                <option value="sad">Sad</option>
                <option value="salsa">Salsa</option>
                <option value="samba">Samba</option>
                <option value="sertanejo">Sertanejo</option>
                <option value="show-tunes">Show Tunes</option>
                <option value="singer-songwriter">Singer/Songwriter</option>
                <option value="ska">Ska</option>
                <option value="sleep">Sleep</option>
                <option value="songwriter">Songwriter</option>
                <option value="soul">Soul</option>
                <option value="soundtracks">Soundtracks</option>
                <option value="spanish">Spanish</option>
                <option value="study">Study</option>
                <option value="summer">Summer</option>
                <option value="swedish">Swedish</option>
                <option value="synth-pop">Synth Pop</option>
                <option value="tango">Tango</option>
                <option value="techno">Techno</option>
                <option value="trance">Trance</option>
                <option value="trip-hop">Trip Hop</option>
                <option value="turkish">Turkish</option>
                <option value="work-out">Workout</option>
                <option value="world-music">World-Music</option>
              </select>
            </div>
            <label
              className="form__input-label form__input-label--popularity"
              htmlFor="inputs__pop-selector"
            >
              Do you want an indie artist, or a chart-topper?{" "}
            </label>
            <div className="form__input--popularity-container">
              <p className="form__input--popularity-label">Indie</p>
              <input
                onChange={handlePopularity}
                type="range"
                id="inputs__pop-selector"
                name="pop"
                min="1"
                max="100"
              />
              <p className="form__input--popularity-label">Major</p>
            </div>
            <button className="form__submit" type="submit">
              {!artistId ? "HIT ME!" : "HIT ME AGAIN!"}
            </button>
          </form>
        </section>
        <Player
          recommended={recommended}
          similarArtist={similarArtist}
          setSimilarArtist={setSimilarArtist}
          handleSimilar={handleSimilar}
          handleSubmit={handleSubmit}
          user={user}
          liked={liked}
          artistFromParams={artistFromParams}
          artistId={artistId}
          setArtistId={setArtistId}
        />
        <ToastContainer />
      </div>
    </>
  );
}

export default Inputs;
