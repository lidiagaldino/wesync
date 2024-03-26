export type TInputUserSongDTO = {
  user_id: number;
  url: string;
  customName: string;
  photo: string;
  isPublic: boolean;
  isFavorite: boolean;
};

export type TOutputUserSongDTO = {
  id: number;
  user_id: number;
  url: string;
  customName: string;
  photo: string;
  isPublic: boolean;
  isFavorite: boolean;
};
