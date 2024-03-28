export type TInputQueueDTO = {
  song: {
    id: number;
    name?: string;
  };
};

export type TQueueDTO = {
  songs: {
    id: number;
    name: string;
  }[];
};
