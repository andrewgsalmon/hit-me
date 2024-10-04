export type Artist = {
  id: string;
  name: string;
  album: string;
};

export type Album = {
  name: string;
  images: Images[];
};

export type Images = {
  url: string
}

export type Recommended = {
  artists: Artist[];
  name: string;
  album: Album;
  id: string;
};

export type ArtistComment = {
  id: string;
  name: string;
  email: string;
  comment: string;
  artist_id: string;
  created_at: string;
  updated_at: string;
};

export type LikedArtist = {
  id: string;
  artist_name: string;
  artist_id: string;
  artist_img: string;
  artist_genre: string;
}