import React from "react";
import "./SearchResult.scss";

function SearchResult({
  customSearch,
  setCustomSearch,
  setSeedTrack
}) {

  let inputValue = document.querySelector(".custom-input__search-bar");

  const handleBlur = () => {
    setTimeout(() => {
      setCustomSearch(null);
    }, 50);
    }

  inputValue.addEventListener("blur", handleBlur);

  const handleSelectTrack = (e) => {
    e.preventDefault();

    setSeedTrack(customSearch);

    setTimeout(() => {
      setCustomSearch(null);
    }, 500);
  };

  return (
    <article className="form__custom-input--result">
      <div className="form__custom-input--result-info">
        <h3 className="form__custom-input--trackname">{customSearch.name}</h3>
        <p className="form__custom-input--artist">
          {customSearch.artists[0].name}
        </p>
        <p className="form__custom-input--album">{customSearch.album.name}</p>
      </div>
      <button
        onClick={handleSelectTrack}
        className="form__custom-input--select"
      >
        SELECT
      </button>
    </article>
  );
}

export default SearchResult;
