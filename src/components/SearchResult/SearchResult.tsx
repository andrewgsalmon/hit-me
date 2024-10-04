import React, { Dispatch, SetStateAction } from "react";
import { Recommended } from "../../types/artist";
import "./SearchResult.scss";

interface SearchResultProps {
  customSearch: Recommended | null;
  setCustomSearch: Dispatch<SetStateAction<Recommended[] | null>>;
  setSeedTrack: (value: Recommended | null) => void;
}

function SearchResult({
  customSearch,
  setCustomSearch,
  setSeedTrack,
}: SearchResultProps) {
  const handleSelectTrack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (customSearch) {
      setSeedTrack(customSearch);

      setTimeout(() => {
        setCustomSearch(null);
      }, 50);
    }
  };

  return (
    <>
      <article className="form__custom-input--result">
        <div className="form__custom-input--result-info">
          <img
            src={`${customSearch?.album?.images[2]?.url}`}
            alt={`${customSearch?.album.name} album cover`}
            className="form__custom-input--album-art"
          />
          <div className="form__custom-input--track-info">
            <h3 className="form__custom-input--trackname">
              {customSearch?.name}
            </h3>
            <p className="form__custom-input--artist">
              {customSearch?.artists[0].name}
            </p>
            <p className="form__custom-input--album">{customSearch?.album.name}</p>
          </div>
        </div>
        <button
          onClick={handleSelectTrack}
          className="form__custom-input--select"
        >
          SELECT
        </button>
      </article>
    </>
  );
}

export default SearchResult;
