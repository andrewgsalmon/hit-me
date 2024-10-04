import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FailedAuth.scss";
const giphyKey = process.env.REACT_APP_GIPHY_KEY;

function FailedAuth() {
  const [gif, setGif] = useState("");
  const [altText, setAltText] = useState("");

  sessionStorage.removeItem("token");

  useEffect(() => {
    const giphy = async () => {
      try {
        const response = await axios.get(
          "https://api.giphy.com/v1/gifs/search",
          {
            params: {
              q: "oops",
              api_key: giphyKey,
              rating: "pg",
            },
          }
        );

        const random = Math.floor(Math.random() * 25);

        setGif(response.data.data[random].images.original.url);
        setAltText(response.data.data[random].title);
      } catch (error) {
        console.error(`hmm... API call didn't go through! ${error}`);
      }
    };

    giphy();
  }, []);

  return (
    <section className="failed-auth">
      <span className="failed-auth__giphy-attribution">randomly powered by Giphy</span>
      <img
        className="failed-auth__giphy-embed"
        src={gif}
        alt={`${altText} - powered by Giphy`}
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
