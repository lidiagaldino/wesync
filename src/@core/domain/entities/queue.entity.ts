import { UserSong } from './user-song.entity';

export type TQueueProps = {
  songs: UserSong[];
};

/**
 * A class that represents a Queue.
 */
export class Queue {
  private id: number;
  private props: TQueueProps;

  private constructor(props: TQueueProps) {
    this.props = props;
  }

  /**
   * Returns the ID of the queue.
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Returns the songs in the queue.
   */
  public getSongs(): UserSong[] {
    return this.props.songs;
  }

  /**
   * Sets the ID of the queue.
   *
   * @param id the ID to set
   */
  public setId(id: number): void {
    this.id = id;
  }

  /**
   * Sets the songs in the queue.
   *
   * @param songs the songs to set
   */
  public setSongs(songs: UserSong[]): void {
    this.props.songs = songs;
  }

  /**
   * Adds a song to the end of the queue.
   *
   * @param song the song to add
   */
  public addSong(song: UserSong): void {
    this.props.songs.push(song);
  }

  /**
   * Removes a song from the queue.
   *
   * @param song the song to remove
   */
  public removeSong(song: UserSong): void {
    this.props.songs = this.props.songs.filter(
      (s) => s.getId() != song.getId(),
    );
  }

  /**
   * Clears the songs in the queue.
   */
  public clearSongs(): void {
    this.props.songs = [];
  }

  /**
   * Returns true if the queue is empty, false otherwise.
   *
   * @returns true if the queue is empty, false otherwise
   */
  public isEmpty(): boolean {
    return this.props.songs.length == 0;
  }

  /**
   * Reorders the songs in the queue according to the new order specified by `newOrder`.
   *
   * @param newOrder the index of the song that should be moved to the front of the queue
   */
  public changeOrder(newOrder: number): void {
    this.props.songs = this.props.songs.map((s, i) => {
      if (i == newOrder) {
        return s;
      } else {
        return this.props.songs[newOrder];
      }
    });
  }
}
