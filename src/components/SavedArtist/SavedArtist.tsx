import React from "react";
import { Link } from "react-router-dom";
import { LikedArtist } from "../../types/artist";
import "./SavedArtist.scss";

interface SavedArtistProps {
  like: LikedArtist;
  handleDelete: any;
}

function SavedArtist({ like, handleDelete }: SavedArtistProps) {
  let savedArtistId = `saved-artist-${like.id}`;
  let backgroundImg = {
    backgroundImage: `url('${like.artist_img}')`,
  };

  return (
    <article id={savedArtistId} className="saved-artists__artist">
      <div
        className="saved-artists__remove-like--tablet"
        aria-label="remove liked artist from your profile"
        onClick={() =>
          handleDelete(like.artist_id, like.artist_name, savedArtistId)
        }
      ></div>
      <div
        className="saved-artists__remove-like--mobile"
        onClick={() =>
          handleDelete(like.artist_id, like.artist_name, savedArtistId)
        }
      >
        remove
      </div>
      <div
        className="saved-artists__thumb"
        style={backgroundImg}
        role="img"
        aria-label={`Photo of ${like.artist_name}`}
      ></div>
      <div className="saved-artists__artist-info">
        <div className="saved-artists__artist-name">
          <h3 className="saved-artists__artist-h3">{like.artist_name}</h3>
          <h4 className="saved-artists__artist-info--genre">
            {like.artist_genre}
          </h4>
        </div>
        <Link
          className="saved-artists__link"
          to={`../artist/${like.artist_id}`}
        >
          Listen now
        </Link>
      </div>
    </article>
  );
}

export default SavedArtist;
