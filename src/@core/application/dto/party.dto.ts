export type TInputPartyDTO = {
  name: string;
  owner_id: number;
  isPublic: boolean;
  members: { user_id: number; isAdmin: boolean }[];
};

export type TOutputMemberDTO = {
  id: number;
  owner_id: number;
  isPublic: boolean;
  invite: string;
  members: { user_id: number; isAdmin: boolean }[];
  songs: { song_id: number; name: string }[];
};
