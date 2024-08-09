import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Inputs.scss";
import Player from "../Player/Player";
import SearchResult from "../SearchResult/SearchResult";
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function Inputs({ user, idFromParams }) {
  const [accessToken, setAccessToken] = useState(null);

  const [toggleGenre, setToggleGenre] = useState(true);
  const [genreSelected, setGenreSelected] = useState(null);
  const [genrePlainText, setGenrePlainText] = useState(null);
  const [popularity, setPopularity] = useState(50);
  const [recommended, setRecommended] = useState(null);
  const [artistId, setArtistId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [similarArtist, setSimilarArtist] = useState(null);

  const [customSearch, setCustomSearch] = useState(null);
  const [seedTrack, setSeedTrack] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [similarLoading, setSimilarLoading] = useState(false);

  const notify = (type, message) => {
    if (type === "error") {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
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
        sessionStorage.setItem("spotifyToken", data.access_token);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  }, []);

  useEffect(() => {
    const toggle = document.querySelector(".inputs__recommendation-selector");

    if (!toggleGenre) {
      toggle.classList.add("inputs__recommendation-selector--song");
    } else {
      toggle.classList.remove("inputs__recommendation-selector--song");
    }
  }, [toggleGenre]);

  useEffect(() => {
    const getGenre = async () => {
      const header = {
        Authorization: `Bearer ${accessToken}`,
      };

      const requestOptions = {
        method: "GET",
        headers: header,
      };

      let apiUrl = "";

      if (recommended) {
        apiUrl = `https://api.spotify.com/v1/artists/${recommended.artists[0].id}`;
      } else if (similarArtist) {
        apiUrl = `https://api.spotify.com/v1/artists/${similarArtist.id}`;
      }

      if (recommended || similarArtist) {
        try {
          const response = await axios.get(apiUrl, requestOptions);
          setGenrePlainText(response.data.genres[0]);
        } catch (error) {
          console.error("There was a problem with the request:", error);
        }
      }
    };
    getGenre();
  }, [recommended, similarArtist, accessToken]);

  const handleGenreChange = (e) => {
    const { value } = e.target;
    const { text } = e.target.options[e.target.selectedIndex];
    setGenreSelected(value);
    setGenrePlainText(text);
  };

  const handlePopularity = (e) => {
    const { value } = e.target;
    setPopularity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (toggleGenre && !genreSelected) {
      notify("error", "Ahem... a genre, please?");
      return;
    }

    if (!toggleGenre && !seedTrack) {
      notify("error", "Search and select a song before submitting!");
      return;
    }

    let seedTrackParam;

    if (seedTrack) {
      seedTrackParam = `&seed_tracks=${seedTrack.id}`;
    }

    let genreParam = `&seed_genres=${genreSelected}`;

    let apiUrl = `https://api.spotify.com/v1/recommendations?limit=100&market=CA${genreParam}&target_popularity=${popularity}`;

    if (!genreSelected) {
      apiUrl = `https://api.spotify.com/v1/recommendations?limit=100&market=CA&target_popularity=${popularity}${seedTrackParam}`;
    }

    const header = {
      Authorization: `Bearer ${accessToken}`,
    };

    const requestOptions = {
      method: "GET",
      headers: header,
    };

    setIsLoading(true);

    try {
      const response = await axios.get(apiUrl, requestOptions);
      const randomArtist = Math.floor(
        Math.random() * response.data.tracks.length
      );
      setRecommended(response.data.tracks[randomArtist]);
      setSimilarArtist(null);
      setLiked(false);
    } catch (error) {
      console.error("There was a problem with the request:", error);
    }

    setSimilarArtist(false);
    setIsLoading(false);
  };

  const handleSimilar = (e) => {
    e.preventDefault();
    setSimilarLoading(true);

    const apiUrl = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
    const header = {
      Authorization: `Bearer ${accessToken}`,
    };

    const requestOptions = {
      method: "GET",
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
        const random = Math.floor(Math.random() * data.artists.length);
        setSimilarArtist(data.artists[random]);
        setSimilarLoading(false);
        setRecommended(false);
        setLiked(false);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  };

  const handleCustomInput = async (e) => {
    let input = e.target.value.split(" ").join("+");

    const apiUrl = `https://api.spotify.com/v1/search?q=${input}&type=track&market=US&limit=20&offset=0`;
    const header = {
      Authorization: `Bearer ${accessToken}`,
    };

    const requestOptions = {
      headers: header,
    };

    if (input.length >= 5) {
      setTimeout(async () => {
        try {
          const response = await axios.get(apiUrl, requestOptions);
          setCustomSearch(response.data.tracks.items);
        } catch (error) {
          console.error("There was a problem with the request:", error);
        }
      }, 200);
    }
  };

  return (
    <>
      <h1 className="home__heading">Welcome, {user.name}!</h1>
      <div className="home__desktop-toggle">
        <section className="inputs">
          <div className="inputs__recommendation-container">
            <h3 className="inputs__recommendation-toggle--heading">
              I want new music based on:
            </h3>
            <div className="inputs__recommendation-toggle--container">
              <span className="inputs__recommendation-toggle--label">
                <strong>Genre</strong>
              </span>
              <div
                onClick={() => {
                  setToggleGenre(!toggleGenre);
                  setSeedTrack(null);
                  setGenreSelected(null);
                }}
                className="inputs__recommendation-toggle"
              >
                <div className="inputs__recommendation-selector"></div>
              </div>
              <span className="inputs__recommendation-toggle--label">
                <strong>Similar song</strong>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="inputs__form">
            <article className="form__first-parameter">
              {!toggleGenre ? (
                <>
                  <label className="form__input-label" htmlFor="custom-input">
                    Get music that sounds like:
                  </label>
                  {seedTrack ? (
                    ""
                  ) : (
                    <input
                      className="custom-input__search-bar"
                      name="custom-input"
                      id="custom-input"
                      placeholder="Enter awesome song here..."
                      onChange={handleCustomInput}
                    />
                  )}
                  {seedTrack ? (
                    <div className="custom-input__selected-artist">
                      <article className="custom-input__selected-artist--track">
                        {seedTrack.name}
                      </article>
                      <article className="custom-input__selected-artist--artist">
                        by: <strong>{seedTrack.artists[0].name}</strong>
                      </article>
                      <button
                        className="custom-input__selected-artist--delete"
                        onClick={() => {
                          setSeedTrack(null);
                          setCustomSearch(null);
                        }}
                      ></button>
                    </div>
                  ) : (
                    ""
                  )}
                  {customSearch && (
                    <div className="form__custom-input--result-list">
                      {customSearch.map((result) => {
                        return (
                          <SearchResult
                            key={result.id}
                            setSeedTrack={setSeedTrack}
                            customSearch={result}
                            setCustomSearch={setCustomSearch}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="inputs__genre">
                  <label
                    className="form__input-label form__input-label--genre"
                    htmlFor="inputs__genre-selector"
                  >
                    What genre are you feeling today?
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
              )}
            </article>
            <label
              className="form__input-label form__input-label--popularity"
              htmlFor="inputs__pop-selector"
            >
              The artist should be:
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
            <button
              className={isLoading ? "form__submit form__submit--loading" : "form__submit"}
              type="submit"
            >
              {isLoading ? "" : !artistId ? "HIT ME!" : "HIT ME AGAIN!"}
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
          artistId={artistId}
          setArtistId={setArtistId}
          similarLoading={similarLoading}
          genreSelected={genreSelected}
          genrePlainText={genrePlainText}
        />
        <ToastContainer />
      </div>
    </>
  );
}

export default Inputs;
