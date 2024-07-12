import React from "react";
import "./Welcome.scss";
import mobileMockup from "../../assets/images/mobile-mockup.png";
import Head from "../../layout/Head";

function Welcome() {
  return (
    <>
      <Head
        title="Welcome"
        description="Take control of your Spotify recommendations with Hit Me!"
        canonical="/"
      />
      <section className="welcome-page">
        <article className="welcome-page__app-description-container">
          <p className="welcome-page__app-description">
            Welcome to <strong>Hit Me</strong> - Your home for better Spotify
            artist recommendations. Discover new music, save what you love, and
            engage with others that love your favorites too!
          </p>
          <div className="welcome-page__cta-container welcome-page__cta-container--desktop">
            <a
              className="welcome-page__cta-link welcome-page__cta-link--login"
              href="./login"
            >
              <button className="welcome-page__button welcome-page__button--login">
                Login
              </button>
            </a>
            or
            <a
              className="welcome-page__cta-link welcome-page__cta-link--register"
              href="./register"
            >
              <button className="welcome-page__button welcome-page__button--register">
                Register
              </button>
            </a>
          </div>
        </article>
        <article className="welcome-page__app-mockup-container">
          <div className="welcome-page__app-mockup">
            <img
              className="welcome-page__app-mockup-img"
              src={mobileMockup}
              alt="Hit Me mockup on a smartphone"
            />
          </div>
        </article>
        <article className="welcome-page__cta-container welcome-page__cta-container--mobile">
          <a
            className="welcome-page__cta-link welcome-page__cta-link--login"
            href="./login"
          >
            <button className="welcome-page__button welcome-page__button--login">
              Login
            </button>
          </a>
          or
          <a
            className="welcome-page__cta-link welcome-page__cta-link--register"
            href="./register"
          >
            <button className="welcome-page__button welcome-page__button--register">
              Register
            </button>
          </a>
        </article>
      </section>
    </>
  );
}

export default Welcome;
