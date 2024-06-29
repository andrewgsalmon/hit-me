import React from "react";
import "./Loading.scss";
import loadingSpinner from '../../assets/icons/infinite-spinner.svg'

function Loading() {
  return (
    <>
      <main className="loading-container">
        <img src={loadingSpinner} alt="loading spinner"/>
        <p>- Loading -</p>
      </main>
    </>
  );
}

export default Loading;
