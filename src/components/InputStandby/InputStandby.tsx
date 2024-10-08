import React from "react";
import britney from "../../assets/images/britney.gif";
import "./InputStandby.scss";

function InputStandby() {
  return (
    <div className="output__standby">
      <img
        className="home__britney-gif"
        src={britney}
        alt="gif of britney spears waiting in class"
      />
      <br />
      What are you waiting for...
      <br />
      <strong>Hit us</strong> with your preferences!
    </div>
  );
}

export default InputStandby;
