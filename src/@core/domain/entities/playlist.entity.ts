import { Guard } from '../shared/core/guard/guard.core';
import { Result } from '../shared/core/result/result.core';
import { Url } from '../value-objects/url.value-object';
import { UserSong } from './user-song.entity';
import { User } from './user.entity';

export type TPlaylistProps = {
  name: string;
  description: string;
  photo: Url;
  user: User;
  isPublic: boolean;
  songs: UserSong[];
};

/**
 * A class that represents a Playlist.
 */
export class Playlist {
  private id: number;
  private props: TPlaylistProps;

  /**
   * Private constructor for creating a Playlist instance.
   * @param props - The properties of the Playlist.
   */
  constructor(props: TPlaylistProps) {
    this.props = props;
  }

  /**
   * Creates a new playlist.
   *
   * @param props - the properties of the playlist to create
   * @returns a Result containing the created playlist or an error
   */
  public static create(props: TPlaylistProps): Result<Playlist> {
    const guardResults = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.user, argumentName: 'user' },
      { argument: props.isPublic, argumentName: 'isPublic' },
      { argument: props.songs, argumentName: 'songs' },
      { argument: props.photo, argumentName: 'photo' },
    ]);
    if (guardResults.isFailure) {
      return Result.fail<Playlist>(guardResults.getErrorValue());
    }
    return Result.ok(new Playlist(props));
  }

  /**
   * Returns the id of the playlist.
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Returns the name of the playlist.
   */
  public getName(): string {
    return this.props.name;
  }

  /**
   * Returns the description of the playlist.
   */
  public getDescription(): string {
    return this.props.description;
  }

  /**
   * Returns the photo of the playlist.
   */
  public getPhoto(): Url {
    return this.props.photo;
  }

  /**
   * Returns the user that owns the playlist.
   */
  public getUser(): User {
    return this.props.user;
  }

  /**
   * Returns the public status of the playlist.
   */
  public getIsPublic(): boolean {
    return this.props.isPublic;
  }

  /**
   * Returns the songs in the playlist.
   */
  public getSongs(): UserSong[] {
    return this.props.songs;
  }

  /**
   * Sets the id of the playlist.
   *
   * @param id - the id to set
   */
  public setId(id: number): void {
    this.id = id;
  }

  /**
   * Sets the name of the playlist.
   *
   * @param name - the name to set
   */
  public setName(name: string): void {
    this.props.name = name;
  }

  /**
   * Sets the description of the playlist.
   *
   * @param description - the description to set
   */
  public setDescription(description: string): void {
    this.props.description = description;
  }

  /**
   * Sets the photo of the playlist.
   *
   * @param photo - the photo to set
   */
  public setPhoto(photo: Url): void {
    this.props.photo = photo;
  }

  /**
   * Sets the user of the playlist.
   *
   * @param user - the user to set
   */
  public setUser(user: User): void {
    this.props.user = user;
  }

  /**
   * Sets the public status of the playlist.
   *
   * @param isPublic - Indicates whether the playlist should be public or private.
   */
  public setIsPublic(isPublic: boolean): void {
    this.props.isPublic = isPublic;
  }

  /**
   * Sets the songs of the playlist.
   *
   * @param songs - the songs to set
   */
  public setSongs(songs: UserSong[]): void {
    this.props.songs = songs;
  }

  /**
   * Adds a song to the playlist.
   *
   * @param song - the song to add
   */
  public addSong(song: UserSong): void {
    this.props.songs.push(song);
  }

  /**
   * Removes a song from the playlist.
   *
   * @param song - the song to remove
   */
  public removeSong(song: UserSong): void {
    this.props.songs = this.props.songs.filter(
      (s) => s.getId() !== song.getId(),
    );
  }

  /**
   * Toggles the public status of the playlist.
   *
   * @remarks
   * This method changes the value of the `isPublic` property of the playlist.
   */
  public togglePublic(): void {
    this.props.isPublic = !this.props.isPublic;
  }
}
