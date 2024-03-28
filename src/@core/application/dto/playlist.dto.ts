export type TInputPlaylistDTO = {
  name: string;
  description: string;
  photo: string;
  user_id: number;
  isPublic: boolean;
  songs: { user_song_id: number }[];
};

export type TOutputPlaylistDTO = {
  id: number;
  name: string;
  description: string;
  photo: string;
  user_id: number;
  isPublic: boolean;
  songs: { user_song_id: number }[];
};
