import React from "react";
import britney from "../../assets/images/britney.gif";
import "./OutputStandby.scss";

function OutputStandby() {
  return (
    <div className="output__standby">
      <img
        className="home__britney-gif"
        src={britney}
        alt="gif of britney spears waiting in class"
      />
      <article className="output__standby--copy">
        What are you waiting for...
        <br />
        <strong>Hit us</strong> with your preferences!
      </article>
    </div>
  );
}

export default OutputStandby;
