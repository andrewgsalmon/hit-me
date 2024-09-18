import React, { useState } from "react";
import "./Welcome.scss";
import mobileMockup from "../../assets/images/mobile-mockup.png";
import Head from "../../layout/Head";

function Welcome() {
  const [demoToggle, setDemoToggle] = useState(false);

  return (
    <>
      <Head
        title="Welcome"
        description="Take control of your Spotify recommendations with Hit Me!"
        canonical="/"
      />
      {demoToggle && (
        <article className="welcome-page__demo">
          <div className="welcome-page__demo-container">
            <iframe
              className="welcome-page__demo-iframe"
              width="700"
              height="315"
              src="https://www.youtube.com/embed/s3xAxtqa6hY?si=FkatHZvNoUIPfmLo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <button
              className="welcome-page__demo--close"
              onClick={() => setDemoToggle(false)}
            ></button>
          </div>
        </article>
      )}
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
            <span className="welcome-page__button-divider">or</span>
            <a
              className="welcome-page__cta-link welcome-page__cta-link--register"
              href="./register"
            >
              <button className="welcome-page__button welcome-page__button--register">
                Register
              </button>
            </a>
          </div>
          <button
            onClick={() => setDemoToggle(true)}
            className="welcome-page__button welcome-page__button--demo-toggle welcome-page__button--demo-toggle--desktop"
          >
            View a Demo!
          </button>
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
        <article className="welcome-page__cta-section">
          <div className="welcome-page__cta-container welcome-page__cta-container--mobile">
            <a
              className="welcome-page__cta-link welcome-page__cta-link--login"
              href="./login"
            >
              <button className="welcome-page__button welcome-page__button--login">
                Login
              </button>
            </a>
            <span className="welcome-page__button-divider">or</span>
            <a
              className="welcome-page__cta-link welcome-page__cta-link--register"
              href="./register"
            >
              <button className="welcome-page__button welcome-page__button--register">
                Register
              </button>
            </a>
          </div>
          <button
            onClick={() => setDemoToggle(true)}
            className="welcome-page__button welcome-page__button--demo-toggle  welcome-page__button--demo-toggle--mobile"
          >
            View a Demo!
          </button>
        </article>
      </section>
    </>
  );
}

export default Welcome;
