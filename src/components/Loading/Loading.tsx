import React, {useState, useEffect} from "react";
import "./Loading.scss";
import loadingSpinner from '../../assets/icons/infinite-spinner.svg'

function Loading() {

const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRendered(true)
    }, 200);
  }, [])

  return (
    <>
      <main className={rendered ? "loading-container" : "loading-container loading-container__hidden"}>
        <img src={loadingSpinner} alt="loading spinner"/>
        <p>- Loading -</p>
      </main>
    </>
  );
}

export default Loading;
